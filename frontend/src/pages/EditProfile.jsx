import React, {useState} from "react";

function EditProfile() {
    const [previewUrl, setPreviewUrl] = useState(null);//미리보기 화면담는 변수

    //각 요소를 리스트에 담기
    const profileItems = [
        { label: "이름: ", key: "name" },
        { label: "이메일: ", key: "email" },
        { label: "소개: ", key: "bio" },
        { label: "전화번호: ", key: "phone" },
    ];
    
    const profileItems2 =[
        { label: "링크추가 ", key: "addlink" },
        { label: "LinkedIn URL", key: "linkedin" },
        { label: "GitHub URL ", key: "github" },
        { label: "개인 웹사이트 URL ", key: "personalweb" },
        { label: "개인 웹사이트 이름", key:"personalwebname"},
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
                            className="w-[180px] rounded-full bg-gray-200 object-cover mr-10"
                        />
                        <button className="border border-gray-800 w-[120px] h-[45px] rounded-lg mt-16 hover:text-white hover:bg-[#3D4EFE]">사진 업로드</button>

                    </div>
                    {/*map함수 사용으로 간단한 ui처리*/}
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



                    <div className="mt-10 space-y-2.5">
                        {/* 링크추가는 border-b만 */}
                        <div className="border-b border-black pb-2">
                            링크추가
                        </div>

                        {/* 링크추가 제외한 나머지 */}
                        <div className="space-y-2.5">
                            {profileItems2
                                .filter(item => item.key !== "addlink")
                                .map((item) => {
                                    // 개인 웹사이트 URL, 이름은 한 줄 flex로 묶기 위해 따로 처리
                                    if (item.key === "personalweb") {
                                        return (
                                            <div key="personalweb-group" className="flex gap-2">
                                                <div className="border border-black rounded-lg p-2 flex-1 flex flex-col">
                                                    <label className="font-semibold mb-1">개인 웹사이트 URL</label>
                                                    <input
                                                        type="text"
                                                        className="w-full outline-none bg-transparent"
                                                    />
                                                </div>
                                                <div className="border border-black rounded-lg p-2 flex-1 flex flex-col">
                                                    <label className="font-semibold mb-1">개인 웹사이트 이름</label>
                                                    <input
                                                        type="text"
                                                        className="w-full outline-none bg-transparent"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }
                                    // personalwebname는 위에서 이미 같이 처리했으니 스킵
                                    if (item.key === "personalwebname") return null;

                                    // 그 외 항목들은 border 다 적용하고 label + input 함께 배치
                                    return (
                                        <div
                                            key={item.key}
                                            className="border border-black rounded-lg p-2 flex flex-col"
                                        >
                                            <label className="font-semibold mb-1">{item.label}</label>
                                            <input
                                                type="text"
                                                className="w-full outline-none bg-transparent"
                                            />
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
