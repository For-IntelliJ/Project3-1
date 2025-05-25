import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import TagFilter from "../components/TagFilter";

const allTags = ["React", "JavaScript", "HTML", "기타"];

const dummyData = [
    {
        title: "React에서 상태 관리는 어떻게 하나요?",
        writer: "갓다",
        date: "2024.05.01",
        views: 128,
        commentCount: 3,
        tags: ["React"]
    },
    {
        title: "JavaScript에서 map과 forEach의 차이는?",
        writer: "프론트초보",
        date: "2024.05.02",
        views: 97,
        commentCount: 5,
        tags: ["JavaScript"]
    },
    {
        title: "HTML 시멘틱 태그가 중요한 이유는?",
        writer: "웹입문자",
        date: "2024.05.03",
        views: 43,
        commentCount: 1,
        tags: ["HTML"]
    }
];

function CommunityPage() {
    const [keyword, setKeyword] = useState("");
    const [sort, setSort] = useState("recent");
    const [selectedTag, setSelectedTag] = useState(null);
    const navigate = useNavigate();

    const filtered = dummyData
        .filter((item) =>
            item.title.toLowerCase().includes(keyword.toLowerCase())
        )
        .filter((item) =>
            selectedTag ? item.tags.includes(selectedTag) : true
        )
        .sort((a, b) => {
            if (sort === "views") return b.views - a.views;
            if (sort === "comments") return b.commentCount - a.commentCount;
            return 0; // 최신순은 그대로
        });

    return (
        <div className="w-full max-w-4xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">커뮤니티 질문</h1>
                <button
                    onClick={() => navigate("/ask")}
                    className="bg-[#3D4EFE] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#2c3ed9]"
                >
                    질문하기
                </button>
            </div>

            {/* 검색/정렬/필터 */}
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <SearchBar keyword={keyword} onChange={setKeyword} />
                <SortSelect value={sort} onChange={setSort} />
            </div>
            <TagFilter tags={allTags} selected={selectedTag} onSelect={setSelectedTag} />

            {/* 리스트 */}
            <div className="space-y-4 mt-6">
                {filtered.length > 0 ? (
                    filtered.map((item, idx) => <QuestionCard key={idx} {...item} />)
                ) : (
                    <p className="text-gray-500">검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default CommunityPage;
