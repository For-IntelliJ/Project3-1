import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyFreePosts } from "../constants/dummyFreePosts";

function FreeBoardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([
    { id: 1, writer: "댓글러1", content: "재밌게 읽었습니다." },
    { id: 2, writer: "익명", content: "좋은 글이에요!" },
  ]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const found = dummyFreePosts.find((p) => p.id === Number(id));
    if (found) {
      found.views += 1;
      setPost({ ...found });
    }
  }, [id]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      writer: "익명",
      content: commentText,
    };
    setComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  if (!post) return <div className="p-6">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-[#3D4EFE] mb-4 hover:underline"
      >
        ← 뒤로가기
      </button>

      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        {post.writer} · {post.date} · 조회수 {post.views}
      </div>
      <div className="text-gray-800 leading-relaxed mb-10 whitespace-pre-wrap">
        {post.content}
      </div>

      {/* 댓글 */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">댓글 {comments.length}개</h2>

        <div className="space-y-3 mb-4">
          {comments.map((c) => (
            <div key={c.id} className="border-b pb-2">
              <p className="text-gray-800 text-sm">{c.content}</p>
              <p className="text-xs text-gray-500 mt-1">작성자: {c.writer}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3D4EFE]"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-[#3D4EFE] text-white rounded-md hover:bg-[#2c3ed9]"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default FreeBoardDetailPage;
