import {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import React from 'react';
import JoinPage from './pages/JoinPage';
import LogIn from './pages/LogIn';
import Main from './pages/Main';
import MyPage from "./pages/MyPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main/>}/> {/* 메인페이지 기본 설정*/}
                <Route path="/login" element={<LogIn/>}/>{/*로그인페이지*/}
                <Route path="/join" element={<JoinPage/>}/> {/* 홈 페이지는 옵션 */}
                <Route path="/mypage" element={<MyPage/>}/> {/*마이페이지*/}
                {/* 필요한 다른 페이지도 여기에 추가 가능 */}
            </Routes>
        </Router>
    );
}

export default App;
