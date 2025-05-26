import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FreeBoardCard from "../components/FreeBoardCard";
import { dummyFreePosts } from "../constants/dummyFreePosts"; // 이렇게 불러오기



function FreeBoardPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = parseInt(searchParams.get("page")) || 1;
    const tab = searchParams.get("tab") || "free"; // tab 정보 유지
    const [currentPage, setCurrentPage] = useState(pageParam);
    const pageSize = 3;

    const totalPages = Math.ceil(dummyFreePosts.length / pageSize);
    const paginatedData = dummyFreePosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setSearchParams({ tab, page }); // tab 유지한 채 page만 변경
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-10 px-4">
            <h2 className="text-xl font-bold mb-6">자유게시판</h2>

            <div className="space-y-4">
                {paginatedData.map((post) => (
                    <FreeBoardCard key={post.id} {...post} />
                ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-10">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    &laquo;
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
                        className={`px-3 py-1 rounded border ${
                            currentPage === i + 1
                                ? "bg-[#3D4EFE] text-white border-[#3D4EFE]"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    &raquo;
                </button>
            </div>
        </div>
    );
}

export default FreeBoardPage;
