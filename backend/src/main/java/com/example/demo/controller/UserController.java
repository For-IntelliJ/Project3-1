package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // http://localhost:8080/register?username=홍길동&email=hong@example.com
    @GetMapping("/register")
    public RedirectView registerUser(
            @RequestParam("username") String username,
            @RequestParam("email") String email) {

        // 유저 저장
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        userRepository.save(user);

        return new RedirectView("/success");
    }

    @GetMapping("/success")
    public String successPage() {
        return "회원 등록이 완료되었습니다!";
    }
}
