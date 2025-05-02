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
                <div className="container mx-auto flex justify-between items-center mb-4">
                    {/* 왼쪽: 로고 + 텍스트 */}
                    <div className="flex items-center space-x-5">
                        <img src="/img/MainLogo.png" alt="Main Logo" className="h-10"/>
                        <h1 className="text-2xl font-bold font-pretendard">잇다</h1> {/*프리텐다드 글꼴 적용*/}
                    </div>

                    {/* 오른쪽: 내비게이션 */}
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#home" className="hover:underline font-pretendard">더보기</a></li>
                            <li><a href="#about" className="hover:underline font-pretendard">클래스등록</a></li>
                            <li><a href="#contact" className="hover:underline font-pretendard">로그인</a></li>
                        </ul>
                    </nav>
                </div>

                {/* 클래스검색과 마이페이지를 로고와 동일한 너비로 배치 */}
                <div className="container mx-auto">
                    <nav>
                        <ul className="flex space-x-8">
                            <li>
                                <a href="#Search"
                                   className="text-lg font-bold font-pretendard hover:underline hover:text-[#3D4EFE] transition-colors duration-200">
                                    클래스검색
                                </a>
                            </li>
                            <li>
                                <a href="#Mypage"
                                   className="text-lg font-bold font-pretendard hover:underline hover:text-[#3D4EFE] transition-colors duration-200">
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
            </main>


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
