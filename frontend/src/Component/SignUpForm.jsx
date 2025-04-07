// SignUpForm.jsx
import React, { useState } from "react";

const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // 스프링 서버로 리다이렉션 GET 요청
        window.location.href = `http://localhost:8080/register?username=${encodeURIComponent(
            username
        )}&email=${encodeURIComponent(email)}`;
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">이름</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">이메일</label>
                    <input
                        type="email"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl"
                >
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
