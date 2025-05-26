import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { dummyFreePosts } from "../constants/dummyFreePosts";

function FreeBoardWritePage() {
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        const newPost = {
            id: dummyFreePosts.length + 1,
            ...data,
            date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
            views: 0,
            likeCount: 0,
            commentCount: 0,
        };

        dummyFreePosts.unshift(newPost);
        navigate(`/free/${newPost.id}`);
    };


    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">자유게시판 글쓰기</h1>
            <PostForm onSubmit={handleSubmit} showTags={false} />
        </div>
    );
}
export default FreeBoardWritePage;
