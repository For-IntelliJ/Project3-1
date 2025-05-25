import React from "react";

const dummyFreePosts = [
    {
        id: 1,
        title: "이번 중간고사 너무 어렵지 않았나요?",
        writer: "컴소과22",
        date: "2024.05.24",
        content: "진짜 알고리즘 파트 너무 힘들었음... 다들 어땠어요?",
        likeCount: 8,
        commentCount: 3,
    },
    {
        id: 2,
        title: "스터디 그룹 모집해요! (프론트엔드)",
        writer: "코딩쪼렙",
        date: "2024.05.23",
        content: "React, Tailwind 같이 공부하실 분 구해요! 온라인 위주입니다.",
        likeCount: 5,
        commentCount: 1,
    },
    {
        id: 3,
        title: "잇다 플랫폼 UI 너무 예쁘다 ㄷㄷ",
        writer: "UI덕후",
        date: "2024.05.22",
        content: "누가 디자인했는지 몰라도 감각 미쳤음ㅋㅋ",
        likeCount: 12,
        commentCount: 0,
    },
];

function FreeBoardPage() {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">자유게시판</h2>
            <div className="space-y-4">
                {dummyFreePosts.map((post) => (
                    <div
                        key={post.id}
                        className="p-4 border border-gray-200 rounded-md hover:shadow-sm transition bg-white"
                    >
                        <h3 className="text-lg font-semibold text-[#3D4EFE] mb-1">
                            {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                            {post.writer} · {post.date}
                        </p>
                        <p className="text-gray-800 line-clamp-2">{post.content}</p>
                        <div className="text-sm text-gray-500 mt-2">
                            ❤️ {post.likeCount} · 💬 {post.commentCount}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FreeBoardPage;
