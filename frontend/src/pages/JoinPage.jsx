import React from 'react';

const JoinPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#EBEFFF]">
      <div className="flex h-full w-full max-w-[1200px] overflow-hidden rounded-xl bg-white">
        {/* 왼쪽 영역 */}
        <div className="relative flex-[0.47] bg-[#EBEFFF]">
          <div className="absolute left-[20%] top-[55%] h-96 w-[130%] origin-top-left rotate-[-97deg] rounded-[6rem] bg-indigo-500" />
          <div className="absolute left-[18%] top-[58%] h-96 w-[130%] origin-top-left -rotate-90 rounded-[6rem] bg-indigo-300" />

          <img
            className="absolute left-[21%] top-[40%]"
            src={process.env.PUBLIC_URL + '/img/joinImg.png'}
            alt="가입 일러스트"
          />
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex flex-[0.53] flex-col items-center justify-center bg-[#EBEFFF] text-xl">
          {/*작성 폼*/}
          <div className="flex w-full flex-col items-center justify-center">
            <h2 className="mb-6 text-center text-2xl font-bold">회원가입</h2>
            <form className="space-y-4">
              <p className="mb-1 text-font">이름</p>
              <input
                type="text"
                placeholder="이름"
                className="p- w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
              />
              <p className="mb-1 text-font">사용자명(닉네임)</p>
              <input
                type="text"
                placeholder="닉네임"
                className="p- w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
              />
              <p className="mb-1 text-font">Email</p>
              <input
                type="text"
                placeholder="Email"
                className="p- w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
              />
              <p className="mb-1 text-font">비밀번호</p>
              <input
                type="text"
                placeholder="비밀번호"
                className="p- w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
              />
              <p className="mb-1 text-font">비밀번호 확인</p>
              <input
                type="text"
                placeholder="비밀번호 확인"
                className="p- w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
              />

              <button className="w-full rounded bg-[#405DF9] py-2 text-white">
                회원가입
              </button>
            </form>
            <p className="mt-4 text-center text-sm">
              이미 계정이 있으신가요?{' '}
              <a href="/login" className="text-blue-500">
                로그인
              </a>
            </p>
            <button className="mt-4 h-auto w-auto flex-col justify-center border-none bg-transparent p-0">
              <img
                src={process.env.PUBLIC_URL + '/img/kakao_login.png'}
                alt="카카오로그인"
                className="block"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
