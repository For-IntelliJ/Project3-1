package com.example.demo.service;

import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 * 사용자 관련 비즈니스 로직을 처리하는 서비스 클래스
 * - 회원가입 등의 사용자 관련 기능을 담당
 * - 공통 기능을 담고 있는 GenericService<User>를 상속받아 기능 확장
 */
@Service // Spring이 이 클래스를 서비스 컴포넌트로 인식해서 빈으로 등록
public class UserService extends GenericService<User> {
    private final UserRepository userRepository;
    /**
     * UserService 생성자
     * - UserRepository를 주입받아 상위 GenericService에 전달
     *
     * @param userRepository 사용자 정보를 저장/조회하는 JPA 리포지터리
     */
    public UserService(UserRepository userRepository) {
        super(userRepository); // GenericService<T>에 userRepository를 전달
        this.userRepository = userRepository; // 따로 저장
    }

    /**
     * 회원가입 기능
     * - User 객체를 전달받아 DB에 저장하는 역할
     * - 필요한 유효성 검사나 추가 로직이 있다면 이 메서드에 작성 가능
     *
     * @param user 저장할 사용자 객체
     */
    public void registerUser(User user) {
        save(user); // GenericService의 save() 메서드 호출 (JPA save)
    }

    public boolean validateUser(String email, String password) {
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null && existingUser.getPassword().equals(password)) {
            return true;
        }
        return false;
    }
}
