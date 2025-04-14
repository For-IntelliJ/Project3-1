package com.example.demo.repository;

import com.example.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // 로그인 시 사용자가 입력한 이메일로 사용자 조회
    Optional<User> findByEmail(String email);

}
