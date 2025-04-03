import React, { useState } from 'react';

const JoinForm = () => {
    const [form, setForm] = useState({ id: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('회원가입 정보:', form);
        // 여기에 API 요청 등을 넣을 수 있어요
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

                <label className="block mb-4">
                    <span className="block text-sm font-medium">아이디</span>
                    <input
                        type="text"
                        name="id"
                        value={form.id}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </label>

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
