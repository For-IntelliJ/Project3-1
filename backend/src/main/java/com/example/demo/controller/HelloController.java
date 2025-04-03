package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // 이 클래스가 REST 컨트롤러임을 나타냄 (JSON 응답 반환)
public class HelloController {

    @GetMapping("/api/test") // HTTP GET 요청이 "/api/test" 엔드포인트로 들어오면 실행됨
    public String hello() {
        return "이것은 백엔드 연결 테스트입니다."; // 문자열 응답 반환 (백엔드에서 "테스트입니다."를 반환)
    }
}
