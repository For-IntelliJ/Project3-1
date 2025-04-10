import React from "react";

const JoinPage = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-[#EBEFFF]">
            <div className="flex w-[70rem] h-[40rem] rounded-xl overflow-hidden shadow-xl bg-white">
                {/* 왼쪽: 이미지 및 회전 박스 */}
                <div className="relative w-1/2 bg-[#E8EBFF] flex items-center justify-center">
                    {/* 회전된 박스들 */}
                    <>
                        <div className="absolute w-[453.31px] h-[677.09px] origin-top-left rotate-[-97.17deg] bg-indigo-500 rounded-[105.53px]" />
                        <div className="absolute w-96 h-[635px] origin-top-left -rotate-90 bg-indigo-300 rounded-[105.53px]" />
                    </>
                    <img
                        src={process.env.PUBLIC_URL + "/img/joinImg.png"}
                        alt="가입일러스트"
                        className="z-10 w-[20rem]"
                    />
                </div>

                {/* 오른쪽: 회원가입 폼 */}
                <div className="w-1/2 px-12 py-10 bg-[#E8EBFF]">
                    <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="이름"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="사용자명(닉네임)"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        <button className="w-full bg-[#405DF9] text-white py-2 rounded">
                            회원가입
                        </button>
                    </form>
                    <p className="text-center text-sm mt-4">
                        이미 계정이 있으신가요?{" "}
                        <a href="/login" className="text-blue-500">
                            로그인
                        </a>
                    </p>
                    <button className="flex p-0 border-none bg-transparent w-auto h-auto justify-center mt-4">
                        <img
                            src={process.env.PUBLIC_URL + "/img/kakao_login.png"}
                            alt="카카오로그인"
                            className="block"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinPage;
