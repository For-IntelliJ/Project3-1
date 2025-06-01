import React, { useEffect, useRef } from "react";

function EditProfileModal({ onClose }) {
    const fileInputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose(); // esc 누르면 모달 닫기
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // 숨겨진 input 클릭
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("업로드된 파일:", file);
            // TODO: 미리보기나 서버 전송 로직 추가
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-xl w-full max-w-lg h-[450px] flex flex-col">
                <h2 className="text-xl font-bold mb-4">프로필 이미지 수정</h2>

                <form className="flex flex-col flex-grow">
                    {/* 미리보기 이미지 영역 */}
                    <div className="flex-grow bg-gray-100 rounded mb-4 flex flex-col items-center justify-center">
                        <span className="text-gray-400 mb-2">미리보기 이미지 영역</span>
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                        >
                            사진 업로드
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    {/* 하단 버튼 */}
                    <div className="flex justify-end space-x-2 mt-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded"
                        >
                            취소
                        </button>
                        <button className="px-4 py-2 bg-[#3D4EFE] text-white rounded">
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfileModal;
