// import {useEffect, useState} from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import JoinPage from "./pages/JoinPage";
import ClassMaker from "./pages/ClassMaker";
import LogIn from "./pages/LogIn";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FAQPage from "./pages/FAQPage";
import CommunityPage from "./pages/CommunityPage";
import AskQuestionPage from "./pages/AskQuestionPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";


function App() {
  return (
      <div className="min-h-screen flex flex-col"> {/* 전체 화면 세로 정렬 */}
          <Router>
              <Header />
              <main className="flex-grow"> {/* 여기에 페이지 내용이 들어감 */}
                  <Routes>
                      <Route path="/" element={<Main />} />
                      <Route path="/login" element={<LogIn />} />
                      <Route path="/join" element={<JoinPage />} />
                      <Route path="/mypage" element={<MyPage />} />
                      <Route path="/classmaker" element={<ClassMaker />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/community" element={<CommunityPage />} />
                      <Route path="/ask" element={<AskQuestionPage />} />
                      <Route path="/questions/:id" element={<QuestionDetailPage />} />
                  </Routes>
              </main>
              <Footer />
          </Router>
      </div>
  );
}

export default App;
