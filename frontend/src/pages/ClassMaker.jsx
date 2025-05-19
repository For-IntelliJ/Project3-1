// src/pages/ClassMaker.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassMaker = () => {
    const [mainStep, setMainStep] = useState(0);
    const [step2SubStep, setStep2SubStep] = useState(0);
    const [categories, setCategories] = useState([]);
    const [regions, setRegions] = useState([]);
    const [mentorName, setMentorName] = useState('');

    const [formData, setFormData] = useState({
        onlineOffline: '',
        title: '',
        categoryId: '',
        mainImage: null,
        detailImage: null,
        detail: '',
        curriculumDifficulty: '',
        curriculum: '',
        mentorIntro: '',
        spaceRegionId: '',
        spaceRegionName: '',
        spaceAddress: ''
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const resCat = await axios.get('/api/categories');
                console.log('categories API 응답 데이터:', resCat.data);
                setCategories(resCat.data);
            } catch (e) {
                console.error('카테고리 로드 실패:', e);
                //setCategories([{ id:1,name:'코딩' },{ id:2,name:'AI' }]);
            }
            try {
                const resReg = await axios.get('/api/regions');
                console.log('regions API 응답 데이터:', resReg.data);
                setRegions(resReg.data);
            } catch (e) {
                console.error('지역 로드 실패:', e);
                // setRegions([
                //     {id:1,name:'서울'},{id:2,name:'경기'},{id:3,name:'부산'},
                //     {id:4,name:'대구'},{id:5,name:'인천'},{id:6,name:'광주'},
                //     {id:7,name:'대전'},{id:8,name:'울산'},{id:9,name:'세종'},
                //     {id:10,name:'강원'},{id:11,name:'충청도'},{id:12,name:'전라도'},
                //     {id:13,name:'경상도'},{id:14,name:'제주'}
                // ]);
            }
            try {
                const resMentor = await axios.get('/api/users/1');
                console.log('mentor API 응답 데이터:', resMentor.data);
                setMentorName(resMentor.data.username);
            } catch (e) {
                console.error('멘토 로드 실패:', e);
                //setMentorName('홍길동');
            }
        };
        fetchInitialData();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) setFormData(prev => ({ ...prev, [field]: file }));
    };

    const handleNext = e => {
        e.preventDefault();
        if (mainStep === 0) {
            setMainStep(1);
            setStep2SubStep(0);
        } else if (step2SubStep < 3) {
            setStep2SubStep(prev => prev + 1);
        }
    };

    const handlePrev = e => {
        e.preventDefault();
        if (step2SubStep > 0) {
            setStep2SubStep(prev => prev - 1);
        } else {
            setMainStep(0);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const fd = new FormData();
        const classData = {
            classname:      formData.title,
            mento:          { id: 1 },
            mentoInfo:      formData.mentorIntro,
            category:       { id: parseInt(formData.categoryId, 10) },
            curriculum:     formData.curriculum,
            onoff:          formData.onlineOffline === 'online' ? '온라인' : '오프라인',
            level:          formData.curriculumDifficulty,
            detailContent:  formData.detail,
            spaceInfo:      formData.spaceRegionName,
            addr:           formData.spaceAddress,
            region:         { id: parseInt(formData.spaceRegionId, 10) }
        };
        fd.append('classData', new Blob([JSON.stringify(classData)], { type: 'application/json' }));
        if (formData.mainImage)   fd.append('mainImage', formData.mainImage);
        if (formData.detailImage) fd.append('detailImage', formData.detailImage);
        console.log('classData 응답 데이터:', classData);
        try {
            let response;
            if (formData.mainImage || formData.detailImage) {
                response = await axios.post('/api/classes/with-files', fd, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                response = await axios.post('/api/classes', classData);
            }

            console.log('서버 응답:', response);
            console.log('응답 데이터(response.data):', response.data);
            alert('클래스 생성 성공!');
        } catch (err) {
            console.error('Axios 에러 객체:', err);
            console.error('서버 에러 응답(err.response):', err.response);
            console.error('서버 에러 응답 데이터(err.response.data):', err.response?.data);

            const serverMsg = err.response?.data
                ? JSON.stringify(err.response.data)
                : err.message;
            alert(`클래스 생성 실패: ${serverMsg}`);
        }
    };

    const renderStepContent = () => {
        if (mainStep === 0) {
            return (
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">클래스 유형 선택</h2>
                    <label className="inline-flex items-center mr-4">
                        <input
                            type="radio"
                            name="onlineOffline"
                            value="online"
                            checked={formData.onlineOffline === 'online'}
                            onChange={handleChange}
                            className="mr-2"
                        /> 온라인
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="onlineOffline"
                            value="offline"
                            checked={formData.onlineOffline === 'offline'}
                            onChange={handleChange}
                            className="mr-2"
                        /> 오프라인
                    </label>
                </div>
            );
        }
        switch (step2SubStep) {
            case 0:
                return (
                    <div className="p-4 space-y-4">
                        <h2 className="text-xl font-semibold">Step 2-1. 기본 정보</h2>
                        <input
                            className="border w-full p-2 rounded"
                            type="text"
                            name="title"
                            placeholder="제목"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <select
                            className="border w-full p-2 rounded"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                        >
                            <option value="">카테고리 선택</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <div className="flex space-x-4">
                            <label className="flex-1">
                                <span className="block mb-1">메인 이미지</span>
                                <input
                                    type="file"
                                    onChange={e => handleFileChange(e, 'mainImage')}
                                    className="block w-full"
                                />
                            </label>
                            <label className="flex-1">
                                <span className="block mb-1">상세 이미지</span>
                                <input
                                    type="file"
                                    onChange={e => handleFileChange(e, 'detailImage')}
                                    className="block w-full"
                                />
                            </label>
                        </div>
                        <textarea
                            className="border w-full p-2 rounded"
                            name="detail"
                            rows="4"
                            placeholder="상세 설명"
                            value={formData.detail}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 1:
                return (
                    <div className="p-4 space-y-4">
                        <h2 className="text-xl font-semibold">Step 2-2. 커리큘럼</h2>
                        <select
                            className="border w-full p-2 rounded"
                            name="curriculumDifficulty"
                            value={formData.curriculumDifficulty}
                            onChange={handleChange}
                        >
                            <option value="">난이도 선택</option>
                            <option value="초급">초급</option>
                            <option value="중급">중급</option>
                            <option value="고급">고급</option>
                        </select>
                        <textarea
                            className="border w-full p-2 rounded"
                            name="curriculum"
                            rows="6"
                            placeholder="커리큘럼 내용"
                            value={formData.curriculum}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="p-4 space-y-4">
                        <h2 className="text-xl font-semibold">Step 2-3. 멘토 소개</h2>
                        <input
                            className="border w-full p-2 rounded bg-gray-100"
                            type="text"
                            value={mentorName}
                            disabled
                        />
                        <textarea
                            className="border w-full p-2 rounded"
                            name="mentorIntro"
                            rows="4"
                            placeholder="멘토 소개글"
                            value={formData.mentorIntro}
                            onChange={handleChange}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="p-4 space-y-4">
                        <h2 className="text-xl font-semibold">Step 2-4. 공간 정보</h2>
                        <select
                            className="border w-full p-2 rounded"
                            name="spaceRegionId"
                            value={formData.spaceRegionId}
                            onChange={e => {
                                const id = e.target.value;
                                const name = regions.find(r => r.id.toString() === id)?.name || '';
                                setFormData(prev => ({
                                    ...prev,
                                    spaceRegionId: id,
                                    spaceRegionName: name
                                }));
                            }}
                        >
                            <option value="">지역 선택</option>
                            {regions.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>
                        <input
                            className="border w-full p-2 rounded"
                            type="text"
                            name="spaceAddress"
                            placeholder="상세 주소"
                            value={formData.spaceAddress}
                            onChange={handleChange}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-8">
                <form onSubmit={handleSubmit}>
                    {renderStepContent()}
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                        >
                            이전
                        </button>
                        {mainStep === 0 || step2SubStep < 3 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                            >
                                다음
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                            >
                                클래스 생성
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClassMaker;
