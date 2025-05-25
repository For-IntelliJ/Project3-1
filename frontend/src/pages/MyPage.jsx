import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const MyPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [activeTab, setActiveTab] = useState('statistics'); // 탭 상태

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('업로드 성공: ' + response.data.imageUrl);
        } catch (err) {
            console.error('업로드 실패:', err);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">

            {/* 메인 콘텐츠 */}
            <main className="flex-grow overflow-hidden relative">
                <div className="p-6 max-w-[1100px] mx-auto flex gap-10">
                    {/* 왼쪽 블럭 */}
                    <div className="w-1/3 flex flex-col items-start gap-4">
                        <div>
                            <div>
                                <img
                                    src={previewUrl || "/img/Basic_Profile.png"}
                                    alt="미리보기"
                                    className="w-[220px] h-[220px] rounded-full bg-gray-200 mt-10 object-cover"
                                />
                            </div>

                            <div className="text-2xl font-bold mt-4 mb-4 text-center">
                                잇다
                            </div>
                        </div>


                        <div
                            onClick={handleUpload}
                            className="w-[220px] h-[100px] pt-9 mb-4 border border-[#3D4EFE] text-center text-[#3D4EFE] font-bold rounded-md transition duration-300 hover:bg-[#3D4EFE] hover:text-white hover:border-white">
                            오늘의 다짐 작성하기
                        </div>

                        <button
                            onClick={handleUpload}
                            className="w-[220px] h-[40px] border border-gray-800 text-center text-gray-800 rounded-md font-bold transition duration-300 hover:bg-gray-800 hover:text-white hover:border-white"
                        >
                            프로필 수정하기
                        </button>

                        <button
                            type="button"
                            onClick={() => document.getElementById("profile-upload").click()}
                            className="w-[220px] h-[40px] mt-2 border border-gray-800 text-gray-700 rounded-md font-bold hover:bg-gray-100 transition"
                        >
                            이미지 선택하기
                        </button>

                        {/* 숨겨진 실제 input */}
                        <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    {/* 오른쪽 블럭 */}
                    <div className="w-2/3 flex flex-col gap-6 mt-10">
                        {/* 탭 버튼 */}
                        <div className="flex gap-4 border-b pb-2">
                            <button
                                className={`text-lg font-bold ${activeTab === 'statistics' ? 'text-[#3D4EFE]' : 'text-gray-500'} hover:text-[#3D4EFE]`}
                                onClick={() => setActiveTab('statistics')}
                            >
                                학습 통계
                            </button>
                            <button
                                className={`text-lg font-bold ${activeTab === 'community' ? 'text-[#3D4EFE]' : 'text-gray-500'} hover:text-[#3D4EFE]`}
                                onClick={() => setActiveTab('community')}
                            >
                                커뮤니티 활동
                            </button>
                        </div>

                        {/* 탭 내용 */}
                        {activeTab === 'statistics' && (
                            <div className="flex gap-4">
                                <div className="w-[500px] h-[435px] border-2 border-gray-400 rounded-lg p-4">
                                    <p className="text-lg font-semibold text-gray-700">출석</p>
                                    <p className="text-sm text-gray-600 mt-2">여기에 원하는 내용을 넣을 수 있어요.</p>
                                </div>
                                <div className="w-[400px] h-[435px] border-2 border-gray-400 rounded-lg p-4">
                                    <p className="text-lg font-semibold text-gray-700">누적 출석 현황</p>
                                    <p className="text-sm text-gray-600 mt-2">또 다른 내용도 이곳에 넣을 수 있어요.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'community' && (
                            <div className="w-[750px] h-[435px] border-2 border-gray-400 rounded-lg p-4">
                                <p className="text-lg font-semibold text-gray-700">커뮤니티 활동 내역</p>
                                <p className="text-sm text-gray-600 mt-2">게시글, 댓글, 좋아요 등을 보여줄 수 있어요.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyPage;
