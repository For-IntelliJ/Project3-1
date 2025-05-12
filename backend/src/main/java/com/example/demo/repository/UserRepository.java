package com.example.demo.repository;

import com.example.demo.domain.User;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    // 추가적으로 필요한 쿼리 메서드는 여기에 작성
    Optional<User> findByEmail(String email);
}
