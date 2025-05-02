import React from 'react';

function Main() {
    return (
        <div className="flex flex-col min-h-screen"> {/*메인화면의 전체 큰 틀*/}

            {/* 헤더*/}
            <header className="text-black p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    {/* 왼쪽: 로고 + 텍스트 */}
                    <div className="flex items-center space-x-5">
                        <img src="/img/MainLogo.png" alt="Main Logo" className="h-10" />
                        <h1 className="text-xl font-bold font-pretendard">잇다</h1> {/*프리텐다드 글꼴 적용*/}
                    </div>

                    {/* 오른쪽: 내비게이션 */}
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#home" className="hover:underline">Home</a></li>
                            <li><a href="#about" className="hover:underline">About</a></li>
                            <li><a href="#contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>




            {/* 메인콘텐츠 */}
            <main className="flex-grow container mx-auto p-4">
                {/* 여기다가 메인 페이지 내용을 추가하면 돼 */}
                <h2 className="text-3xl font-semibold mb-4">Welcome to the Main Page!</h2>
                <p className="text-gray-700">여기에 메인 컨텐츠 넣기</p>
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
