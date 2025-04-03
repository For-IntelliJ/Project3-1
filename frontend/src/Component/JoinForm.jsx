import React, { useState } from 'react';

const JoinForm = () => {
    // form 상태를 관리하는 state 선언 (id와 password 필드 포함)
    const [form, setForm] = useState({ id: '', password: '' });

    // 입력 필드 값이 변경될 때 호출되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target; // 이벤트에서 name과 value 추출
        setForm({ ...form, [name]: value }); // 기존 form 상태를 유지하면서 변경된 필드 값만 업데이트
    };

    // 폼이 제출될 때 실행되는 함수
    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 제출 동작(페이지 새로고침) 방지
        console.log('회원가입 정보:', form); // 현재 입력된 회원가입 정보를 콘솔에 출력
        // 여기에 백엔드 API 요청 로직 추가 가능
    };

    return (
        // 화면 전체를 차지하는 flex 컨테이너 (가운데 정렬 및 배경색 설정)
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* 회원가입 폼 */}
            <form
                onSubmit={handleSubmit} // 폼 제출 시 handleSubmit 함수 실행
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
            >
                {/* 제목 */}
                <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

                {/* 아이디 입력 필드 */}
                <label className="block mb-4">
                    <span className="block text-sm font-medium">아이디</span>
                    <input
                        type="text"
                        name="id" // 상태 객체의 키와 일치해야 함
                        value={form.id} // 상태에서 현재 아이디 값 반영
                        onChange={handleChange} // 값 변경 시 handleChange 실행
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        required // 필수 입력 필드
                    />
                </label>

                {/* 비밀번호 입력 필드 */}
                <label className="block mb-6">
                    <span className="block text-sm font-medium">비밀번호</span>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </label>

                {/* 제출 버튼 */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
                >
                    가입하기
                </button>
            </form>
        </div>
    );
};

export default JoinForm;
