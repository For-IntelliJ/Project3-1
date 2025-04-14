import React, { Component } from 'react';
import axios from 'axios';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: '',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/login',
        this.state.formData,
      );

      // JWT 토큰 받아오기
      const token = response.data.token;
      console.log('JWT 토큰:', token);

      // 브라우저에 저장 (localStorage or sessionStorage)
      localStorage.setItem('accessToken', token);

      // 로그인 성공 메시지 or 페이지 이동
      alert('로그인 성공!');
      window.location.href = '/home'; // 또는 navigate('/home') 등
    } catch (error) {
      alert('로그인 실패! 이메일/비밀번호를 확인하세요.');
      console.error(error);
    }
  };

  render() {
    const { formData } = this.state;

    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#EBEFFF]">
        {/* 왼쪽 영역 - 로그인 */}
        <div className="mb-[2rem] flex h-full flex-[47%] flex-col items-center justify-center px-12">
          <h2 className="mb-6 text-center text-2xl font-bold">환영합니다</h2>
          <form
            className="flex w-[80%] flex-col space-y-4"
            onSubmit={this.handleSubmit}
          >
            <div>
              <p className="mb-1 text-font">이메일</p>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={this.handleChange}
                placeholder="idda@idda.com"
                className="w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
                required
              />
            </div>

            <div>
              <p className="mb-1 text-font">비밀번호</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={this.handleChange}
                placeholder="비밀번호"
                className="mb-[2rem] w-full rounded border border-hover p-2 transition duration-200 hover:border-2 hover:border-hover focus:border-2 focus:border-hover focus:outline-none"
                required
              />
            </div>

            <div className="mt-[2rem] space-y-8">
              <button
                type="submit"
                className="w-full rounded bg-[#405DF9] py-3 text-white"
              >
                로그인
              </button>

              <button className="mx-auto flex h-auto w-auto flex-col items-center border-none bg-transparent p-0">
                <img
                  src={process.env.PUBLIC_URL + '/img/kakao_login.png'}
                  alt="카카오 로그인"
                  className="block"
                />
              </button>

              <p className="text-center text-sm">
                계정이 없으신가요?{' '}
                <a href="/JoinPage" className="text-blue-500">
                  회원가입
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* 오른쪽 영역 - 이미지 */}
        <div className="relative flex h-full flex-[53%] justify-end">
          {/* 네모 박스 (0층) */}
          <div className="relative z-0 h-full w-[45rem] bg-indigo-300" />

          {/* 일러스트 이미지 (1층) */}
          <img
            className="absolute left-[calc(100%-45vw)] top-1/2 z-10 w-[30vw] -translate-y-1/2 sm:w-[28vw] md:w-[30vw] lg:w-[32vw] xl:w-[34vw]"
            src={process.env.PUBLIC_URL + '/img/logIn.png'}
            alt="가입 일러스트"
          />
        </div>
      </div>
    );
  }
}

export default LogIn;
