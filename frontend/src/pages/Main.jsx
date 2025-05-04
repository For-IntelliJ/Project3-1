import React, {useEffect, useState} from 'react';


const banners = [//배너 2장을 담아 둘 배열
    '/img/Benner1.svg',
    '/img/Benner2.svg',
];

function Main() {

    const [currentIndex, setCurrentIndex] = useState(0);//현재 상태를 나타내는 상수

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* 헤더 */}
            <header className="text-black p-4 shadow-md">
                <div className="mx-auto max-w-[1100px] space-y-4">

                    {/* 상단 로고 + 잇다 텍스트 + 우측 메뉴들 */}
                    <div className="flex items-center justify-between mb-6">
                        {/* 좌측: 로고 + 텍스트 */}
                        <div className="flex items-center space-x-5">
                            <img src="/img/MainLogo.png" alt="Main Logo" className="h-10"/>
                            <h1 className="text-2xl font-bold font-pretendard">잇다</h1>
                        </div>

                        {/* 우측: 메뉴들 */}
                        <nav>
                            <ul className="flex space-x-6">
                                <li>
                                    <a href="#more" className="font-pretendard hover:underline">더보기</a>
                                </li>
                                <li>
                                    <a href="#register" className="font-pretendard hover:underline">클래스등록</a>
                                </li>
                                <li>
                                    <a href="#login" className="font-pretendard hover:underline">로그인</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* 중간 네비게이션: 클래스검색 / 마이페이지 */}
                    <nav>
                        <ul className="flex space-x-8">
                            <li>
                                <a
                                    href="#search"
                                    className="text-lg font-bold font-pretendard hover:underline hover:text-[#3D4EFE] transition-colors duration-200"
                                >
                                    클래스검색
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#mypage"
                                    className="text-lg font-bold font-pretendard hover:underline hover:text-[#3D4EFE] transition-colors duration-200"
                                >
                                    마이페이지
                                </a>
                            </li>
                        </ul>
                    </nav>

                </div>
            </header>


            {/* 메인콘텐츠 */}
            <main className="flex-grow overflow-hidden relative">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{transform: `translateX(-${currentIndex * 100}%)`}}
                >
                    {banners.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`배너 ${index}`}
                            className="w-full h-64 object-cover flex-shrink-0"
                        />
                    ))}
                </div>


                {/* 배너 아래 네모 버튼 4개 */}
                <div className="flex justify-center items-center space-x-14 my-6">
                    {/* 첫 번째 버튼 - 지역 */}
                    <div
                        className="w-[220px] h-20 bg-white-200 hover:bg-gray-300 rounded-md flex items-center px-4 space-x-4 shadow-md"
                    >
                        {/* 아이콘 */}
                        <img src="/img/Local_icon.png" alt="지역 아이콘" className="w-14 h-14"/>

                        {/* 텍스트 묶음 */}
                        <div className="h-20 flex flex-col justify-center">
                            <span className="text-[16px] font-pretendard font-semibold leading-none ml-10">지역</span>
                            <h1 className="text-[10px] font-pretendard text-gray-600 mt-[10px] leading-none">지역별 클래스를
                                둘러보기</h1>
                        </div>
                    </div>


                    {/* 두 번째 버튼 예시 */}
                    <div
                        className="w-[220px] h-20 bg-white-200 hover:bg-gray-300 rounded-md flex items-center px-4 space-x-4 shadow-md">
                        <img src="/img/Type_icon.png" alt="유형 아이콘" className="w-14 h-14"/>
                        {/* 텍스트 묶음 */}
                        <div className="h-20 flex flex-col justify-center">
                            <span className="text-[16px] font-pretendard font-semibold leading-none ml-10">유형</span>
                            <h1 className="text-[10px] font-pretendard text-gray-600 mt-[10px] leading-none">유형별 클래스를
                                둘러보기</h1>
                        </div>
                    </div>


                    {/* 세 번째 버튼 예시 */}
                    <div
                        className="w-[220px] h-20 bg-white-200 hover:bg-gray-300 rounded-md flex items-center px-4 space-x-4 shadow-md">
                        <img src="/img/Category_icon.png" alt="카테고리 아이콘" className="w-14 h-14"/>
                        <div className="h-20 flex flex-col justify-center">
                            <span className="text-[16px] font-pretendard font-semibold leading-none ml-5">카테고리</span>
                            <h1 className="text-[10px] font-pretendard text-gray-600 mt-[10px] leading-none">카테고리별 다양한 클래스</h1>
                        </div>
                    </div>

                    {/* 네 번째 버튼 예시 */}
                    <div
                        className="w-[220px] h-20 bg-white-200 h   hover:bg-gray-300 rounded-md flex items-center px-4 space-x-4 shadow-md">
                        <img src="/img/Level_icon.png" alt="난이도 아이콘" className="w-14 h-14"/>
                        <div className="h-20 flex flex-col justify-center">
                            <span className="text-[16px] font-pretendard font-semibold leading-none ml-8">난이도</span>
                            <h1 className="text-[10px] font-pretendard text-gray-600 mt-[10px] leading-none">난이도별 클래스를
                                둘러보기</h1>
                        </div>
                    </div>
                </div>

            </main>


            <div className="flex space-x-4 mb-auto">
                <h1>단체</h1>
                <h1>스터디</h1>
                <h1>베이킹</h1>
                <h1>반지</h1>
                <h1>드로잉</h1>
                <h1>선물</h1>
                <h1>데이트</h1>
                <h1>향수</h1>
                <h1>스포츠</h1>
                <h1>목공</h1>
            </div>

            <div>
                <h1>잇다에서 사랑받고 있는 클래스</h1>
            </div>


            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    &copy; {new Date().getFullYear()} My Website. All rights reserved.
                </div>
            </footer>
        </div>

    );
}

export default Main;
