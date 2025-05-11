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
        <div style={{ padding: '20px' }}>
            <h2>마이페이지 - 사진 업로드</h2>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            {previewUrl && (
                <div style={{ marginTop: '10px' }}>
                    <img
                        src={previewUrl}
                        alt="미리보기"
                        style={{ width: '200px', height: 'auto', border: '1px solid #ccc' }}
                    />
                </div>
            )}

            <button onClick={handleUpload} style={{ marginTop: '10px' }}>
                업로드하기
            </button>
        </div>
    );
};

export default MyPage;
