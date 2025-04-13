package com.example.demo.controller;

// 사용자 관련 엔티티와 서비스 클래스 import
import com.example.demo.domain.User;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입
import org.springframework.web.bind.annotation.*; // REST API 관련 어노테이션들

/**
 * UserController 클래스
 * - 사용자와 관련된 HTTP 요청을 처리
 * - 예: 회원가입, 로그인 등
 */
@RestController // REST 컨트롤러임을 명시 (JSON 형태로 응답)
@RequestMapping("/user") // 기본 경로: /user
@CrossOrigin(origins = "http://localhost:3000") // React 프론트엔드에서 오는 요청을 허용 (CORS)
public class UserController {

    @Autowired // UserService를 자동으로 주입받음
    private UserService userService;

    /**
     * 회원가입 요청 처리 메서드
     * - React에서 POST 요청을 보냈을 때 실행됨
     * - 클라이언트로부터 전달된 사용자 정보를 @RequestBody로 받아 저장
     *
     * @param user 프론트엔드에서 전달된 사용자 정보 (JSON → User 객체로 자동 매핑됨)
     * @return 문자열 응답 ("회원가입 완료!" 텍스트)
     */
    @PostMapping("/register") // POST 방식 /user/register 요청 매핑
    public String registerUser(@RequestBody User user) {
        System.out.println("🔥 회원가입 요청: " + user.getEmail()); // 디버깅용 출력
        userService.registerUser(user); // 실제 저장 처리
        return "회원가입 완료!"; // 클라이언트에게 응답
    }
}
