import React from 'react';

function Main() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* Header */}
            <header className="bg-blue-500 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">My Website</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#home" className="hover:underline">Home</a></li>
                            <li><a href="#about" className="hover:underline">About</a></li>
                            <li><a href="#contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
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
