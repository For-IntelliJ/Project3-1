import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    // 상태 변수 hello를 선언하고 초기값을 빈 문자열로 설정
    const [hello, setHello] = useState('');

    // 컴포넌트가 마운트될 때 한 번 실행되는 useEffect 훅
    useEffect(() => {
        // 백엔드에서 '/api/test' 엔드포인트로 GET 요청을 보냄
        axios.get('/api/test')
            .then((res) => {
                // 응답 데이터를 hello 상태에 저장
                setHello(res.data);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
            });
    }, []); // 의존성 배열이 비어 있어 컴포넌트가 처음 렌더링될 때만 실행됨

    return (
        <div className="App">
            {/* 백엔드에서 가져온 데이터를 화면에 표시 */}
            백엔드 데이터 : {hello}
        </div>
    );
}

export default App;
