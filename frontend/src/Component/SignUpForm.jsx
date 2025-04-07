// src/components/SignUpForm.js
import React, { useState } from "react";
import axios from "axios";

function SignUpForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 새로고침 방지

        try {
            await axios.get("http://localhost:8080/register", {
                params: {
                    username,
                    email,
                },
            });

            // 회원가입 성공 후 알림창 띄우기
            alert("회원가입이 완료되었습니다!");

            // 입력값 초기화
            setUsername("");
            setEmail("");
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">회원가입</h2>

            <input
                type="text"
                placeholder="이름"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 mb-2 w-full"
                required
            />
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 mb-4 w-full"
                required
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                회원가입
            </button>
        </form>
    );
}

export default SignUpForm;
