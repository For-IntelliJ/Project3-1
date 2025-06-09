import React from "react";

function ChangePassword() {
    return (
        <div className="w-full  py-10 px-4">
            <h1 className="text-2xl font-bold mb-8">😭 회원탈퇴 😭</h1>

            <div className="w-full h-[500px] border-2 border-gray-400 rounded-lg p-8 flex flex-col gap-6 ">
                <div className="flex flex-col gap-2 mt-2">
                    <label className="text-3xl font-semibold mb-6">
                        정말 <span className="text-[#3D4EFE] text-[35px]">"잇다"</span>를 탈퇴하시겠습니까?
                    </label>
                </div>


                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">id재사용 및 복구 불가</label>
                </div>

                <div className="mb-6">
                    사용하고 계신 아이디를 탈퇴하시면 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시길 바랍니다.
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">회원정보/개인형 서비스 이용기록 삭제</label>
                </div>
                <div>
                    회원정보 및 메일, 블로그, 주소록 등 개인형 서비스 이용기록은 모두 삭제되면, 삭제된 데이터는 복구되지 않습니다.
                </div>
                <div className="mb-6">
                    삭제되는 내용을 확인하시고 필요한 데이터는 미리 백업해주세요.
                </div>
                <div className="flex justify-end ">
                    <button className="bg-[#FF3D3D] hover:bg-[#B22222] text-white font-semibold py-2 px-4 rounded-lg w-[100px]">
                        탈퇴하기
                    </button>
                </div>


            </div>
        </div>
    );
}

export default ChangePassword;
