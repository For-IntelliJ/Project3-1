package com.example.demo.service;

import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * 사용자 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
public class UserService extends GenericService<User> {

    private final UserRepository userRepository;

    /**
     * UserService 생성자
     * - UserRepository를 주입받아 상위 GenericService에 전달
     */
    public UserService(UserRepository userRepository) {
        super(userRepository); // GenericService<T>에 userRepository를 전달
        this.userRepository = userRepository;
    }

    /**
     * 전체 사용자 조회
     */
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    /**
     * 회원가입 기능
     */
    public void registerUser(User user) {
        save(user);
    }

    /**
     * ID로 사용자 조회
     */
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다. id=" + id));
    }

    /**
     * 사용자 인증
     */
    public boolean validateUser(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser.map(user -> user.getPassword().equals(password)).orElse(false);
    }
}
