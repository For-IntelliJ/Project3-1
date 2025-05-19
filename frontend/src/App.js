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


function App() {
<<<<<<< Updated upstream
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인페이지 기본 설정*/}
        <Route path="/login" element={<LogIn />} />{/*로그인페이지*/}
        <Route path="/join" element={<JoinPage />} /> {/* 홈 페이지는 옵션 */}
        <Route path="/mypage" element={<MyPage />} /> {/*마이페이지*/}
        <Route path="/calssmaker" element={<ClassMaker />} /> {/* 클래스 생성/등록 페이지*/}
        {/* 필요한 다른 페이지도 여기에 추가 가능 */}
      </Routes>
      <Footer/>
    </Router>
  );
=======
    return (
        <Router>
            <Routes>
                <Route path="/main" element={<Main/>}/> {/* 메인페이지 기본 설정*/}
                <Route path="/login" element={<LogIn/>}/>{/*로그인페이지*/}
                <Route path="/join" element={<JoinPage/>}/> {/* 홈 페이지는 옵션 */}
                <Route path="/" element={<MyPage/>}/> {/*마이페이지*/}
                {/* 필요한 다른 페이지도 여기에 추가 가능 */}
            </Routes>
        </Router>
    );
>>>>>>> Stashed changes
}

export default App;
