import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AskQuestionPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    const allTags = ["HTML", "CSS", "JavaScript", "React", "Spring", "기타"];

    const toggleTag = (tag) => {
        setTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) return alert("제목과 내용을 입력해주세요.");

        console.log({ title, content, tags }); // 추후 API로 전송
        alert("질문이 등록되었습니다!");
        navigate("/community");
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">질문 작성</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 제목 */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="질문 제목을 입력하세요"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D4EFE]"
                    />
                </div>

                {/* 내용 */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="질문 내용을 자세히 입력해주세요"
                        rows="8"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D4EFE]"
                    />
                </div>

                {/* 태그 */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">태그</label>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <button
                                type="button"
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                                    tags.includes(tag)
                                        ? "bg-[#3D4EFE] text-white border-[#3D4EFE]"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-[#3D4EFE]"
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 제출 */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-[#3D4EFE] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#2c3ed9]"
                    >
                        질문 등록
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AskQuestionPage;
