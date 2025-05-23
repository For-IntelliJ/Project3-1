package com.example.demo.repository;

import com.example.demo.domain.Class; // or MyClass 등 실제 클래스명
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<Class, Long> {
}