// src/pages/Main.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassCard from "../components/ClassCard";

// 배너 이미지 정보
const banners = ["/img/Benner1.svg", "/img/Benner2.svg"];

// 카테고리 버튼 정보 (메인 화면 상단 메뉴)
const categoryButtons = [
    { icon: "/img/Local_icon.png", label: "지역", description: "지역별 클래스를 둘러보기" },
    { icon: "/img/Type_icon.png", label: "유형", description: "유형별 클래스를 둘러보기" },
    { icon: "/img/Category_icon.png", label: "카테고리", description: "카테고리별 다양한 클래스" },
    { icon: "/img/Level_icon.png", label: "난이도", description: "난이도별 클래스를 둘러보기" },
];

const Main = () => {
    const [classes, setClasses] = useState([]); // DB에서 받아온 클래스 목록
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const navigate = useNavigate();

    // 배너 자동 전환 (6초마다)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // 백엔드에서 클래스 + 멘토 + 카테고리 정보 fetch
    useEffect(() => {
        async function fetchAllData() {
            try {
                // 클래스 목록 호출 (JSON에 멘토, 카테고리 객체가 포함돼 내려온다고 가정)
                const classRes = await fetch("http://localhost:8080/api/classes");
                if (!classRes.ok) {
                    throw new Error(`클래스 목록 불러오기 실패 (status ${classRes.status})`);
                }
                const classData = await classRes.json();
                console.log(">> [DEBUG] classData:", classData);

                // mento.username 또는 mento.name을 꺼내 mentor_name으로 추가
                const enriched = classData.map((item) => ({
                    ...item,
                    mentor_name: item.mento?.username ?? item.mento?.name ?? "",
                    // category.name을 그대로 내려받아 card에 넘기기
                    category_name: item.category?.name ?? "미분류",
                }));
                console.log(">> [DEBUG] enrichedClasses:", enriched);

                setClasses(enriched);
                setLoading(false);
            } catch (err) {
                console.error(">> [ERROR] fetchAllData 예외:", err);
                setError(err.message);
                setLoading(false);
            }
        }
        fetchAllData();
    }, []);

    // 로딩 화면
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500">로딩 중...</p>
            </div>
        );
    }

    // 에러 화면
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    // 배열을 3개씩 묶는 헬퍼 함수
    const chunkArray = (arr, chunkSize = 3) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };
    const classChunks = chunkArray(classes, 3);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">

            {/* ───────────────────────────────────────────────────────── */}
            {/* 배너 슬라이더 영역 */}
            {/* ───────────────────────────────────────────────────────── */}
            <div className="relative bg-white">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
                >
                    {banners.map((src, idx) => (
                        <div
                            key={idx}
                            className="w-full flex-shrink-0 flex justify-center items-center bg-white"
                        >
                            <img
                                src={src}
                                alt={`배너 ${idx}`}
                                className="object-contain w-full max-h-[400px]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ───────────────────────────────────────────────────────── */}
            {/* 카테고리 버튼 4개 영역 */}
            {/* ───────────────────────────────────────────────────────── */}
            <div className="py-6 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 flex justify-center space-x-8">
                    {categoryButtons.map((btn, idx) => (
                        <div
                            key={idx}
                            className="active:scale-95 w-[220px] h-24 bg-white hover:bg-gray-100 rounded-lg flex items-center px-4 shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                        >
                            <img src={btn.icon} alt={btn.label} className="w-12 h-12" />
                            <div className="ml-4 flex flex-col justify-center">
                <span className="text-lg font-semibold text-gray-800">
                  {btn.label}
                </span>
                                <p className="text-sm text-gray-500 mt-1">
                                    {btn.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ───────────────────────────────────────────────────────── */}
            {/* 클래스 목록 섹션 (3개씩 묶어서 렌더링) */}
            {/* ───────────────────────────────────────────────────────── */}
            <main className="flex-grow">
                {classChunks.map((chunk, chunkIndex) => {
                    let sectionTitle = "";
                    if (chunkIndex === 0) {
                        sectionTitle = "💛 몽글몽글 ⌈감성충만⌋ 클래스들은 어때요? 💛";
                    } else if (chunkIndex === 1) {
                        sectionTitle = "오늘은 왠지 머리 쓰고 싶은 날이네...🤔🤔";
                    } else {
                        sectionTitle = "이런 클래스는 어떠세요?";
                    }

                    return (
                        <section key={chunkIndex} className="py-10 bg-gray-50">
                            <div className="max-w-6xl mx-auto px-4">
                                <h2 className="text-xl font-bold text-gray-700 mb-6">
                                    {sectionTitle}
                                </h2>
                                <div className="flex flex-wrap gap-8">
                                    {chunk.map((item) => {
                                        // 이미지 경로 처리
                                        const imgSrc = item.mainImage
                                            ? item.mainImage.startsWith("http")
                                                ? item.mainImage
                                                : `http://localhost:8080/uploads/classes/${item.mainImage}`
                                            : "/img/default_class.jpg";

                                        return (
                                            <div
                                                key={item.id}
                                                className="cursor-pointer w-[300px] md:w-[30%]"
                                                onClick={() => navigate(`/class/${item.id}`)}
                                            >
                                                <ClassCard
                                                    image={imgSrc}
                                                    title={item.classname}
                                                    instructor={item.mentor_name}
                                                    people={item.people ?? 0}
                                                    category={item.category_name} // category.name을 넘겨줍니다
                                                    onoff={item.onoff}
                                                    level={item.level}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    );
                })}
            </main>
        </div>
    );
};

export default Main;
