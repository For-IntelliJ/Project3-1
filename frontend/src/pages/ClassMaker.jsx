// 수정된 ClassMaker.jsx
// 이것은 클래스 등록 페이지
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassCreationPage = () => {
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
        // 실제 API에서 카테고리 데이터 가져오기
        axios.get('/api/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.error('카테고리 로드 실패', err);
                // 백업 데이터 사용
                setCategories([
                    { id: 1, name: '코딩' },
                    { id: 2, name: 'AI' }
                ]);
            });

        // 실제 API에서 지역 데이터 가져오기
        axios.get('/api/regions')
            .then(res => {
                setRegions(res.data);
            })
            .catch(err => {
                console.error('지역 로드 실패', err);
                // 백업 데이터 사용
                setRegions([
                    { id: 1, name: '서울' }, { id: 2, name: '경기' }, { id: 3, name: '부산' },
                    { id: 4, name: '대구' }, { id: 5, name: '인천' }, { id: 6, name: '광주' },
                    { id: 7, name: '대전' }, { id: 8, name: '울산' }, { id: 9, name: '세종' },
                    { id: 10, name: '강원' }, { id: 11, name: '충청도' }, { id: 12, name: '전라도' },
                    { id: 13, name: '경상도' }, { id: 14, name: '제주' }
                ]);
            });

        // 멘토 정보 불러오기
        axios.get('/user/mentor/1')
            .then(res => {
                setMentorName(res.data.username);
            })
            .catch(err => {
                console.error('멘토 정보 로드 실패', err);
                setMentorName('홍길동'); // 기본값 설정
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            // 파일 객체 자체를 저장
            setFormData(prev => ({ ...prev, [fieldName]: file }));
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (mainStep === 0) {
            setMainStep(1);
            setStep2SubStep(0);
        } else if (mainStep === 1 && step2SubStep < 3) {
            setStep2SubStep(prev => prev + 1);
        }
    };

    const handlePrev = (e) => {
        e.preventDefault();
        if (mainStep === 1) {
            if (step2SubStep > 0) {
                setStep2SubStep(prev => prev - 1);
            } else {
                setMainStep(0);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData 객체 생성 (파일 업로드를 위해)
        const formDataToSend = new FormData();

        // 객체 구조에 맞게 JSON 데이터 구성
        const classData = {
            classname: formData.title,
            mento: { id: 1 },  // 객체 형태로 전달
            mentoInfo: formData.mentorIntro,
            category: { id: parseInt(formData.categoryId, 10) },  // 객체 형태로 전달, 숫자로 변환
            curriculum: formData.curriculum,
            onoff: formData.onlineOffline === 'online' ? '온라인' : '오프라인',
            level: formData.curriculumDifficulty,
            detailContent: formData.detail,  // curriculum이 아닌 detail 사용
            spaceInfo: formData.spaceRegionName,
            addr: formData.spaceAddress,
            region: { id: parseInt(formData.spaceRegionId, 10) }  // 객체 형태로 전달, 숫자로 변환
        };

        // JSON 데이터를 formData에 추가
        formDataToSend.append('classData', new Blob([JSON.stringify(classData)], { type: 'application/json' }));

        // 파일 추가
        if (formData.mainImage) {
            formDataToSend.append('mainImage', formData.mainImage);
        }

        if (formData.detailImage) {
            formDataToSend.append('detailImage', formData.detailImage);
        }

        try {
            // 디버깅을 위한 로그
            console.log('전송할 데이터:', classData);

            // (1) 이미지 업로드가 있는 경우 (FormData 사용)
            if (formData.mainImage || formData.detailImage) {
                await axios.post('/api/classes/with-files', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            // (2) 이미지가 없는 경우 (JSON으로 전송)
            else {
                await axios.post('/api/classes', classData);
            }

            alert('클래스 생성이 완료되었습니다!');
        } catch (error) {
            console.error('클래스 생성 에러:', error);
            console.error('에러 응답:', error.response?.data);
            alert(`클래스 생성 실패! 오류: ${error.response?.data || error.message}`);
        }
    };

    const renderStepContent = () => {
        if (mainStep === 0) {
            return (
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">클래스 유형 선택</h2>
                    <label className="mr-4">
                        <input type="radio" name="onlineOffline" value="online" checked={formData.onlineOffline === 'online'} onChange={handleChange}/> 온라인
                    </label>
                    <label>
                        <input type="radio" name="onlineOffline" value="offline" checked={formData.onlineOffline === 'offline'} onChange={handleChange}/> 오프라인
                    </label>
                </div>
            );
        } else if (mainStep === 1) {
            if (step2SubStep === 0) {
                return (
                    <div className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">Step 2-1. 기본 정보</h2>
                        <input className="border w-full p-2" type="text" name="title" placeholder="제목" value={formData.title} onChange={handleChange} />
                        <select className="border w-full p-2" name="categoryId" value={formData.categoryId} onChange={handleChange}>
                            <option value="">카테고리 선택</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <input className="border" type="file" onChange={(e) => handleFileChange(e, 'mainImage')} /> 메인 이미지 업로드<br/>
                        <input className="border" type="file" onChange={(e) => handleFileChange(e, 'detailImage')} /> 상세 이미지 업로드
                        <textarea className="border w-full p-2" name="detail" value={formData.detail} onChange={handleChange} placeholder="상세 설명"></textarea>
                    </div>
                );
            } else if (step2SubStep === 1) {
                return (
                    <div className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">Step 2-2. 커리큘럼</h2>
                        <select className="border w-full p-2" name="curriculumDifficulty" value={formData.curriculumDifficulty} onChange={handleChange}>
                            <option value="">난이도 선택</option>
                            <option value="초급">초급</option>
                            <option value="중급">중급</option>
                            <option value="고급">고급</option>
                        </select>
                        <textarea className="border w-full p-2" name="curriculum" value={formData.curriculum} onChange={handleChange} placeholder="커리큘럼 내용"></textarea>
                    </div>
                );
            } else if (step2SubStep === 2) {
                return (
                    <div className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">Step 2-3. 멘토 소개</h2>
                        <input className="border w-full p-2 bg-gray-100" type="text" name="mentorName" value={mentorName} disabled />
                        <textarea className="border w-full p-2" name="mentorIntro" value={formData.mentorIntro} onChange={handleChange} placeholder="멘토 소개"></textarea>
                    </div>
                );
            } else if (step2SubStep === 3) {
                return (
                    <div className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">Step 2-4. 공간 정보</h2>
                        <select className="border w-full p-2" name="spaceRegionId" value={formData.spaceRegionId} onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedName = regions.find(r => r.id.toString() === selectedId)?.name || '';
                            setFormData(prev => ({
                                ...prev,
                                spaceRegionId: selectedId,
                                spaceRegionName: selectedName
                            }));
                        }}>
                            <option value="">지역 선택</option>
                            {regions.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>
                        <input className="border w-full p-2" type="text" name="spaceAddress" value={formData.spaceAddress} onChange={handleChange} placeholder="상세 주소"/>
                    </div>
                );
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <form onSubmit={handleSubmit}>
                {renderStepContent()}
                <div className="flex justify-between mt-4">
                    <button type="button" onClick={handlePrev} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">이전</button>
                    {mainStep === 0 || step2SubStep < 3 ? (
                        <button type="button" onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">다음</button>
                    ) : (
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">클래스 생성</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ClassCreationPage;