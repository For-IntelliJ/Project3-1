import React from "react";

const JoinPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F4F6FC]">
      <div className="flex w-[70rem] h-[40rem] rounded-xl overflow-hidden shadow-xl bg-white">
        {/* 왼쪽: 이미지 및 회전 박스 */}
        <div className="relative w-1/2 bg-[#E8EBFF] flex items-center justify-center">
          {/* 회전된 박스 */}
          <div
            style={{
              width: "39.6875rem",
              height: "23.5625rem",
              transform: "rotate(-90deg)",
              flexShrink: 0,
              borderRadius: "6.59563rem",
              background: "#AFB3FF",
              position: "absolute",
              top: "20%",
              left: "-25%",
              zIndex: 0,
            }}
          ></div>

          {/* 삽입할 이미지 (예: 3D 일러스트) */}
          <img
            src="/assets/join-illustration.png" // 여기에 너가 넣고 싶은 이미지 경로
            alt="가입 일러스트"
            className="z-10 w-[20rem]"
          />
        </div>

        {/* 오른쪽: 회원가입 폼 */}
        <div className="w-1/2 px-12 py-10 bg-[#E8EBFF]">
          <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
          <form className="space-y-4">
            <input type="text" placeholder="이름" className="input-box" />
            <input
              type="text"
              placeholder="사용자명(닉네임)"
              className="input-box"
            />
            <input type="email" placeholder="Email" className="input-box" />
            <input
              type="password"
              placeholder="비밀번호"
              className="input-box"
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="input-box"
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
          <button className="w-full mt-4 bg-yellow-400 text-black py-2 rounded flex items-center justify-center">
            <img
              src="/assets/kakao-icon.png"
              alt="카카오"
              className="w-5 h-5 mr-2"
            />
            카카오 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
