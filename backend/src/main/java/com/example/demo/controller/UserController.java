package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 사용자 관련 요청을 처리하는 컨트롤러
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/register")
    public String registerUser(@RequestParam("username") String username,
                               @RequestParam("email") String email) {

        // User 객체 생성 및 값 설정
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);

        // 제네릭 기반 서비스에 저장 요청
        userService.save(user);


        return "회원가입 완료";
    }
}
