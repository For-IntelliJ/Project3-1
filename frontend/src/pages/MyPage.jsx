import React, { useState } from 'react';

const MyPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

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
            const response = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            alert('업로드 성공: ' + result.imageUrl); // or result.s3Key
        } catch (err) {
            console.error('업로드 실패:', err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">마이페이지</h2>
            <h3 className="mt-6 mb-6">파일 업로드 기능을 위한 임시 페이지 입니다. ^^</h3>

            <div className="flex flex-col items-start gap-4"> {/* 수직 배치와 간격 추가 */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border border-gray-300 p-2 w-[300px] rounded-md"
                />

                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="미리보기"
                        className="w-48 h-auto border border-gray-300 rounded-md"
                    />
                )}

                <button
                    onClick={handleUpload}
                    className="w-[300px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    업로드하기
                </button>
            </div>
        </div>
    );

};

export default MyPage;
