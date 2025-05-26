// src/main/java/com/example/demo/repository/BoardRepository.java
package com.example.demo.repository;

import com.example.demo.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Board 엔티티에 대한 JPA 레포지토리
 */
public interface BoardRepository extends JpaRepository<Board, Long> {
    // 필요 시 custom query 메서드 추가 가능
}
