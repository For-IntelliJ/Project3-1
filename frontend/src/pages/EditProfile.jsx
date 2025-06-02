import React, { useState, useRef } from "react";
import EditProfileModal from "../components/EditProfileModal";

function EditProfile() {
    const [previewUrl, setPreviewUrl] = useState(null); // 미리보기 화면 담는 상수
    const fileInputRef = useRef(null); // PC 파일을 input 담는 상수
    const [isModalOpen, setIsModalOpen] = useState(false); //미리보기 Modal을 담는 상수

    const handleUploadClick = () => {
        fileInputRef.current?.click(); // 버튼 클릭 시 input 클릭
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result); // 이미지 미리보기
                setIsModalOpen(true); // 모달 열기
            };
            reader.readAsDataURL(file);
        }
    };

    //모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const profileItems = [
        { label: "이름: ", key: "name" },
        { label: "이메일: ", key: "email" },
        { label: "소개: ", key: "bio" },
        { label: "전화번호: ", key: "phone" },
    ];

    const profileItems2 = [
        { label: "링크추가 ", key: "addlink" },
        { label: "LinkedIn URL", key: "linkedin" },
        { label: "GitHub URL ", key: "github" },
        { label: "개인 웹사이트 URL ", key: "personalweb" },
        { label: "개인 웹사이트 이름", key: "personalwebname" },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-10">프로필 수정하기</h1>
            <div className="w-[800px] h-full border border-gray-800 rounded-xl">
                <div className="m-10">
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
                            >
                                사진 업로드
                            </button>
                            {/* 숨겨진 input */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {/* 모달 렌더링 */}
                            {isModalOpen && (
                                <EditProfileModal
                                    onClose={closeModal}
                                    previewUrl={previewUrl}/>

                            )}
                        </div>
                    </div>

                    {/* 기본 정보 입력 필드 */}
                    <div className="space-y-2.5">
                        {profileItems.map((item) => (
                            <div
                                key={item.key}
                                className={`border border-black rounded-lg p-4 ${
                                    item.key === "bio" ? "h-[250px]" : ""
                                }`}
                            >
                                {item.key === "bio" ? (
                                    <textarea
                                        defaultValue={item.label}
                                        className="font-semibold w-full h-full resize-none outline-none bg-transparent"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        defaultValue={item.label}
                                        className="font-semibold w-full outline-none bg-transparent"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 링크 입력 필드 */}
                    <div className="mt-10 space-y-2.5">
                        <div className="border-b border-black pb-2">링크추가</div>
                        <div className="space-y-2.5">
                            {profileItems2
                                .filter(item => item.key !== "addlink")
                                .map((item) => {
                                    if (item.key === "personalweb") {
                                        return (
                                            <div key="personalweb-group" className="flex gap-2">
                                                <div className="border border-black rounded-lg p-2 flex-1 flex flex-col">
                                                    <label className="font-semibold mb-1">개인 웹사이트 URL</label>
                                                    <input type="text" className="w-full outline-none bg-transparent" />
                                                </div>
                                                <div className="border border-black rounded-lg p-2 flex-1 flex flex-col">
                                                    <label className="font-semibold mb-1">개인 웹사이트 이름</label>
                                                    <input type="text" className="w-full outline-none bg-transparent" />
                                                </div>
                                            </div>
                                        );
                                    }
                                    if (item.key === "personalwebname") return null;

                                    return (
                                        <div
                                            key={item.key}
                                            className="border border-black rounded-lg p-2 flex flex-col"
                                        >
                                            <label className="font-semibold mb-1">{item.label}</label>
                                            <input type="text" className="w-full outline-none bg-transparent" />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;