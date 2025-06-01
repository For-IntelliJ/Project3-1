package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.domain.LoginRequest;  // LoginRequest 임포트 추가
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;  // List 임포트 추가

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 전체 사용자 조회
     * GET http://localhost:8080/api/users
     */
    @GetMapping
    public List<User> getAllUsers() {
        System.out.println("🔥 전체 사용자 조회 요청");
        return userService.findAllUsers();
    }

    /**
     * 회원가입
     * POST http://localhost:8080/api/users/register
     */
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        System.out.println("🔥 회원가입 요청: " + user.getEmail());
        userService.registerUser(user);
        return "회원가입 완료!";
    }

    /**
     * 단일 사용자 조회
     * GET http://localhost:8080/api/users/{id}
     */
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    /**
     * 로그인
     * POST http://localhost:8080/api/users/login
     */
    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("🔥 로그인 요청: " + loginRequest.getEmail());
        boolean isValid = userService.validateUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (isValid) {
            return "로그인 성공!";
        } else {
            return "로그인 실패: 이메일 또는 비밀번호가 틀렸습니다.";
        }
    }
}
