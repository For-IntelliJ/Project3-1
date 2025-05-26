// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 페이지 컴포넌트
import Main from "./pages/Main";
import LogIn from "./pages/LogIn";
import JoinPage from "./pages/JoinPage";
import MyPage from "./pages/MyPage";
import ClassMaker from "./pages/ClassMaker";
import FAQPage from "./pages/FAQPage";
import CommunityLayout from "./pages/CommunityLayout";
import AskQuestionPage from "./pages/AskQuestionPage";
import FreeBoardWritePage from "./pages/FreeBoardWritePage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import MyPageLayout from "./pages/MyPageLayout";

// 공통 컴포넌트
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Router>
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/join" element={<JoinPage />} />
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/classmaker" element={<ClassMaker />} />
                        <Route path="/faq" element={<FAQPage />} />

                        {/* 커뮤니티 메인 (탭 포함) */}
                        <Route path="/community" element={<CommunityLayout />} />

                        {/* 글쓰기 경로들 */}
                        <Route path="/ask/write" element={<AskQuestionPage />} />
                        <Route path="/free/write" element={<FreeBoardWritePage />} />

                        {/* 질문 상세 페이지 */}
                        <Route path="/questions/:id" element={<QuestionDetailPage />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
