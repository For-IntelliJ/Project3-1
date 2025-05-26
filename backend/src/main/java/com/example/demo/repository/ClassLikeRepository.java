package com.example.demo.repository;

import com.example.demo.domain.ClassLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassLikeRepository extends JpaRepository<ClassLike, Long> {
    // 필요 시 classId, userId 기반 중복 체크 등 추가 가능
}
