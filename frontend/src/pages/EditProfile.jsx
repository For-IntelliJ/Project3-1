import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../components/EditProfileModal";
import CancelContentModal from "../components/CancelContentModal";
import axios from "axios";

function EditProfile() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [previewUrl, setPreviewUrl] = useState(null);
    const [modals, setModals] = useState({ edit: false, cancel: false });
    const [isUploading, setIsUploading] = useState(false);

    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        bio: '',
        phone: '',
        linkedin: '',
        github: '',
        personalweb: '',
        personalwebname: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleUploadClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const reader = new FileReader();

        reader.onloadend = async () => {
            if (typeof reader.result === "string") {
                setPreviewUrl(reader.result);
                setModals(prev => ({ ...prev, edit: true }));
            }

            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await axios.post("http://15.168.189.228:8080/api/profile/upload", formData, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log("업로드 결과:", res.data);
            } catch (err) {
                console.error("업로드 실패:", err);
            } finally {
                setIsUploading(false);
            }
        };

        reader.onerror = () => {
            console.error("파일 읽기 실패");
            setIsUploading(false);
        };

        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        navigate("/mypagelayout?tab=profileset", {
            state: {
                profileData,
                previewUrl,
            }
        });
    };

    const handleCancel = () => {
        setModals(prev => ({ ...prev, cancel: true }));
    };

    const confirmCancel = () => {
        setProfileData({
            name: '',
            email: '',
            bio: '',
            phone: '',
            linkedin: '',
            github: '',
            personalweb: '',
            personalwebname: ''
        });
        setPreviewUrl(null);
        setModals({ edit: false, cancel: false });
    };

    const closeModal = (type) => {
        setModals(prev => ({ ...prev, [type]: false }));
    };

    const profileFields = [
        { label: "이름", key: "name" },
        { label: "이메일", key: "email" },
        { label: "오늘의다짐", key: "bio", textarea: true },
        { label: "전화번호", key: "phone" },
        { label: "LinkedIn URL", key: "linkedin" },
        { label: "GitHub URL", key: "github" },
        { label: "개인 웹사이트 URL", key: "personalweb" },
        { label: "개인 웹사이트 이름", key: "personalwebname" }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-10">프로필 수정하기</h1>
            <div className="w-[800px] border border-gray-800 rounded-xl p-10">
                {/* 프로필 이미지 */}
                <div className="flex mb-10">
                    <img
                        src={previewUrl || "/img/Basic_Profile.png"}
                        alt="미리보기"
                        className="w-[180px] h-[180px] rounded-full bg-gray-200 object-cover mr-10"
                    />
                    <div>
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            className="border border-gray-800 w-[120px] h-[45px] rounded-lg mt-16 hover:text-white hover:bg-[#3D4EFE]"
                            disabled={isUploading}
                        >
                            {isUploading ? "업로드 중..." : "사진 업로드"}
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {modals.edit && (
                            <EditProfileModal
                                onClose={() => closeModal("edit")}
                                previewUrl={previewUrl}
                            />
                        )}
                    </div>
                </div>

                {/* 입력 폼 */}
                <div className="space-y-4">
                    {profileFields.map(({ label, key, textarea }) => (
                        <div key={key} className={`border border-black rounded-lg p-4 ${textarea ? "h-[250px]" : "h-[90px]"}`}>
                            <label className="font-semibold mb-2 block">{label}</label>
                            {textarea ? (
                                <textarea
                                    name={key}
                                    value={profileData[key]}
                                    onChange={handleInputChange}
                                    className="w-full h-full resize-none outline-none bg-transparent"
                                />
                            ) : (
                                <input
                                    type="text"
                                    name={key}
                                    value={profileData[key]}
                                    onChange={handleInputChange}
                                    className="w-full outline-none bg-transparent"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* 버튼 영역 */}
                <div className="mt-10 flex justify-end gap-4">
                    <button
                        onClick={handleCancel}
                        className="border border-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-[#3D4EFE] text-white px-6 py-2 rounded-lg hover:bg-[#2d3cd8]"
                    >
                        저장
                    </button>
                </div>
            </div>

            {/* 이중 확인 모달 */}
            {modals.cancel && (
                <CancelContentModal
                    onClose={() => closeModal("cancel")}
                    onConfirm={confirmCancel}
                />
            )}
        </div>
    );
}

export default EditProfile;
