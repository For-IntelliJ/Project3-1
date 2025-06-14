// src/pages/ClassDetail.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const ClassDetail = () => {
    const { id } = useParams();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState("intro");
    const accentColor = "#3d42fe"; // 퍼스널 컬러

    // 섹션별 ref
    const introRef = useRef(null);
    const curriculumRef = useRef(null);
    const hostRef = useRef(null);
    const locationRef = useRef(null);

    // 클릭 시 해당 섹션 스크롤 기능
    const scrollToSection = (ref) => {
        if (ref.current) {
            const topOffset = ref.current.getBoundingClientRect().top + window.pageYOffset - 120;
            window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
    };

    // 스크롤 위치에 따라 activeSection 변경
    useEffect(() => {
        const handleScroll = () => {
            const introTop = introRef.current.getBoundingClientRect().top;
            const curriculumTop = curriculumRef.current.getBoundingClientRect().top;
            const hostTop = hostRef.current.getBoundingClientRect().top;
            const locationTop = locationRef.current.getBoundingClientRect().top;
            const offset = 150; // 헤더 여백

            if (locationTop - offset <= 0) {
                setActiveSection("location");
            } else if (hostTop - offset <= 0) {
                setActiveSection("host");
            } else if (curriculumTop - offset <= 0) {
                setActiveSection("curriculum");
            } else {
                setActiveSection("intro");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // API 호출
    useEffect(() => {
        async function fetchClass() {
            try {
                const res = await fetch(`http://localhost:8080/api/classes/${id}`);
                if (!res.ok) {
                    throw new Error(`클래스 정보를 불러오는 데 실패했습니다. (status ${res.status})`);
                }
                const data = await res.json();
                const enriched = {
                    ...data,
                    mentor_name: data.mento?.username ?? data.mento?.name ?? "알 수 없음",
                    category_name: data.category?.name ?? "미분류",
                    detailImages: data.detail_images ? [data.detail_images] : [],
                };
                setClassData(enriched);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        }
        fetchClass();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-500">로딩 중...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen px-4">
                <p className="text-red-500 text-center text-lg">{error}</p>
            </div>
        );
    }

    // 메인 및 디테일 이미지 경로 처리
    const mainImgSrc = classData.mainImage
        ? classData.mainImage.startsWith("http")
            ? classData.mainImage
            : `http://localhost:8080/uploads/classes/${classData.mainImage}`
        : "/img/default_class.jpg";

    const detailImgSrc =
        classData.detailImages && classData.detailImages.length > 0
            ? classData.detailImages[0].startsWith("http")
                ? classData.detailImages[0]
                : `http://localhost:8080/uploads/classes/${classData.detailImages[0]}`
            : null;

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* 그리드: 좌측 2/3, 우측 1/3 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 좌측 칼럼 */}
                <div className="lg:col-span-2 space-y-6">
                    {/* 메인 이미지 */}
                    <div className="w-full h-80 bg-gray-100 overflow-hidden rounded-lg shadow">
                        <img
                            src={mainImgSrc}
                            alt={classData.classname}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* 썸네일 (최대 4개) */}
                    {classData.detailImages && classData.detailImages.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {[mainImgSrc, ...classData.detailImages]
                                .slice(0, 4)
                                .map((src, idx) => (
                                    <div
                                        key={idx}
                                        className="w-24 h-24 bg-gray-100 overflow-hidden rounded-lg flex-shrink-0"
                                    >
                                        <img
                                            src={src}
                                            alt={`detail-${idx}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ))}
                        </div>
                    )}

                    {/* 제목 및 기본 정보 */}
                    <div className="space-y-4">
                        <h1
                            className="text-4xl font-extrabold"
                            style={{ color: accentColor }}
                        >
                            {classData.classname}
                        </h1>
                        <p className="text-lg text-gray-700">멘토: {classData.mentor_name}</p>

                        <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                카테고리: {classData.category_name}
              </span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                형태: {classData.onoff}
              </span>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                난이도: {classData.level}
              </span>
                            <span className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
                지역: {classData.region?.name ?? classData.addr}
              </span>
                        </div>
                    </div>

                    {/* 탭 메뉴 */}
                    <div className="sticky top-16 bg-white z-10">
                        <div className="flex justify-around border-b">
                            <button
                                onClick={() => scrollToSection(introRef)}
                                className={`py-3 text-lg font-medium ${
                                    activeSection === "intro"
                                        ? "text-indigo-600 border-b-2 border-indigo-600"
                                        : "text-gray-600 hover:text-indigo-500"
                                }`}
                            >
                                클래스 소개
                            </button>
                            <button
                                onClick={() => scrollToSection(curriculumRef)}
                                className={`py-3 text-lg font-medium ${
                                    activeSection === "curriculum"
                                        ? "text-indigo-600 border-b-2 border-indigo-600"
                                        : "text-gray-600 hover:text-indigo-500"
                                }`}
                            >
                                커리큘럼
                            </button>
                            <button
                                onClick={() => scrollToSection(hostRef)}
                                className={`py-3 text-lg font-medium ${
                                    activeSection === "host"
                                        ? "text-indigo-600 border-b-2 border-indigo-600"
                                        : "text-gray-600 hover:text-indigo-500"
                                }`}
                            >
                                호스트 소개
                            </button>
                            <button
                                onClick={() => scrollToSection(locationRef)}
                                className={`py-3 text-lg font-medium ${
                                    activeSection === "location"
                                        ? "text-indigo-600 border-b-2 border-indigo-600"
                                        : "text-gray-600 hover:text-indigo-500"
                                }`}
                            >
                                위치
                            </button>
                        </div>
                    </div>

                    {/* 상세 섹션들 */}
                    <div className="space-y-12">
                        {/* 클래스 소개 */}
                        <section ref={introRef} className="space-y-4 pt-6">
                            <h2
                                className="text-2xl font-semibold"
                                style={{ color: accentColor }}
                            >
                                클래스 소개
                            </h2>
                            <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                                {classData.detailContent || "클래스 소개 내용이 없습니다."}
                            </p>
                        </section>

                        {/* 커리큘럼 */}
                        <section ref={curriculumRef} className="space-y-4 pt-6">
                            <h2
                                className="text-2xl font-semibold"
                                style={{ color: accentColor }}
                            >
                                커리큘럼
                            </h2>
                            <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                                {classData.curriculum || "커리큘럼 정보가 없습니다."}
                            </p>
                        </section>

                        {/* 호스트 소개 */}
                        <section ref={hostRef} className="space-y-4 pt-6">
                            <h2
                                className="text-2xl font-semibold"
                                style={{ color: accentColor }}
                            >
                                호스트 소개
                            </h2>
                            <p className="text-gray-800 leading-relaxed text-lg">
                                {classData.mentoInfo || "호스트 소개 정보가 없습니다."}
                            </p>
                        </section>

                        {/* 위치 */}
                        <section ref={locationRef} className="space-y-4 pt-6 pb-12">
                            <h2
                                className="text-2xl font-semibold"
                                style={{ color: accentColor }}
                            >
                                위치
                            </h2>
                            <p className="text-gray-800 leading-relaxed text-lg">
                                {classData.spaceInfo || "공간 정보가 없습니다."}
                            </p>
                            <p className="text-gray-800 leading-relaxed text-lg">
                                {classData.addr || "주소 정보가 없습니다."}
                            </p>
                        </section>
                    </div>
                </div>

                {/* 우측 칼럼: 클래스 신청 UI */}
                <div className="space-y-6">
                    <div className="border rounded-lg shadow-sm p-4 space-y-4">
                        <div className="flex border-b">
                            <button
                                className="flex-1 py-2 text-center text-white bg-gray-700 rounded-t-lg"
                                style={{ backgroundColor: accentColor }}
                            >
                                1. 클래스 일정
                            </button>
                            <button className="flex-1 py-2 text-center text-gray-600">
                                2. 세부 선택 사항
                            </button>
                        </div>
                        <div className="pt-4 space-y-4">
                            <label className="block text-sm text-gray-700">날짜 선택</label>
                            <input
                                type="date"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            />
                            <p className="flex items-center text-sm text-green-600">
                                <svg
                                    className="w-5 h-5 mr-1 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4"
                                    />
                                </svg>
                                당일 예약 가능 클래스입니다
                            </p>
                            <button className="w-full text-center bg-white border rounded py-2 text-gray-700 hover:bg-gray-50">
                                개설된 클래스
                                <br />
                                구매 후 문의를 통해 일정 조율이 필요해요
                            </button>
                            <div className="mt-4 flex items-center justify-between">
                                <button className="flex-1 border rounded-l py-2 text-gray-700">–</button>
                                <span className="px-4">1</span>
                                <button className="flex-1 border rounded-r py-2 text-gray-700">+</button>
                            </div>
                            <p className="text-right text-xl font-bold">14,900원 /1인</p>
                            <div className="flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-2 border rounded py-2 text-gray-700 hover:bg-gray-50">
                                    찜하기
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 border rounded py-2 text-gray-700 hover:bg-gray-50">
                                    문의하기
                                </button>
                            </div>
                            <button
                                className="w-full bg-indigo-600 text-white rounded py-2 hover:bg-indigo-700"
                                style={{ backgroundColor: accentColor }}
                            >
                                클래스 신청하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetail;
