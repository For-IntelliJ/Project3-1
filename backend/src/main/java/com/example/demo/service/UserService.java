package com.example.demo.service;

import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 * User에 특화된 서비스 - 공통 GenericService를 상속받아 확장
 */
@Service
public class UserService extends GenericService<User> {

    public UserService(UserRepository userRepository) {
        super(userRepository); // 상위 클래스에 UserRepository 주입
    }
    public void registerUser(String username, String email) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);

        // GenericService에 있는 save(T entity) 호출
        save(user);
    }

    // 필요 시 User 전용 메서드 추가 가능
}

