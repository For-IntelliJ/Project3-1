import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import JoinPage from './pages/JoinPage';
import LogIn from './pages/LogIn';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<Home />} /> {/* 홈 페이지는 옵션 */}
        {/* 필요한 다른 페이지도 여기에 추가 가능 */}
      </Routes>
    </Router>
  );
}

export default App;
