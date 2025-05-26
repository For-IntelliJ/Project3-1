package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.domain.LoginRequest;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // 회원가입
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        System.out.println("🔥 회원가입 요청: " + user.getEmail());
        userService.registerUser(user);
        return "회원가입 완료!";
    }

    // 사용자 ID로 정보 조회
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

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
