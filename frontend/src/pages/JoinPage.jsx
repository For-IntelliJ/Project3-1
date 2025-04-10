import React, { useState } from 'react';
import PasswordInput from '../components/PasswordInput'; // 경로는 파일 위치에 맞게 수정

const JoinPage = () => {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      alert('비밀번호를 다시 확인해주세요.');

      // 나중에 회원가입 보내는 어쩌고 넣기
    }
  };

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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <p className="mb-1 text-font">ID</p>
              <input
                type="text"
                placeholder="idda@idda.com"
                className="p- w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
              />
              <PasswordInput onValid={setIsPasswordValid} />
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
              {/* 성별 + 전화번호 한 줄 정렬 */}
              <div className="flex w-full items-center justify-between gap-4">
                {/* 성별 */}
                <div className="flex w-1/2 flex-col">
                  <div className="flex items-center justify-center gap-6">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="accent-indigo-500"
                        required
                      />
                      남자
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="accent-pink-500"
                      />
                      여자
                    </label>
                  </div>
                </div>

                {/* 전화번호 */}
                <div className="flex w-1/2 flex-col">
                  <p className="mb-1 text-font">전화번호</p>
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    pattern="010-[0-9]{4}-[0-9]{4}"
                    inputMode="numeric"
                    maxLength={13}
                    className="w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
                  />
                </div>
              </div>

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
