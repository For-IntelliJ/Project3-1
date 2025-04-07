package com.example.demo.service; // 이 클래스가 service 패키지에 속함을 명시

import com.example.demo.domain.User; // User 엔티티 클래스 임포트
import com.example.demo.repository.UserRepository; // UserRepository 인터페이스 임포트
import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 어노테이션
import org.springframework.stereotype.Service; // 이 클래스가 서비스 레이어임을 나타내는 어노테이션

/**
 * 비즈니스 로직을 담당하는 서비스 클래스
 * 예: 회원 가입 처리, 사용자 조회 등
 */
@Service // Spring이 이 클래스를 서비스 빈(bean)으로 인식하게 함
public class UserService {

    @Autowired // UserRepository를 자동으로 주입받음 (DI)
    private UserRepository userRepository;

    /**
     * 회원 정보를 받아서 데이터베이스에 저장하는 메서드
     *
     * @param username 사용자 이름
     * @param email 사용자 이메일
     */
    public void registerUser(String username, String email) {
        // User 객체 생성 후, 전달받은 값으로 필드 설정
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);

        // JPA를 이용해 사용자 정보를 데이터베이스에 저장
        userRepository.save(user);
    }
}
