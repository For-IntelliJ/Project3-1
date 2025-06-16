//package com.example.demo.repository;
//
//import com.example.demo.domain.Apply;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface ApplyRepository extends JpaRepository<Apply, Long> {
//
//    // 특정 사용자의 신청 목록 조회
//    List<Apply> findByMenteeId(Long menteeId);
//
//    // 특정 클래스의 신청 목록 조회
//    List<Apply> findByClassEntityId(Long classId);
//
//    // 특정 사용자가 특정 클래스에 신청했는지 확인
//    @Query("SELECT a FROM Apply a WHERE a.mentee.id = :menteeId AND a.classEntity.id = :classId")
//    Optional<Apply> findByMenteeIdAndClassId(@Param("menteeId") Long menteeId, @Param("classId") Long classId);
//
//    // 중복 신청 방지를 위한 존재 여부 확인
//    boolean existsByMenteeIdAndClassEntityId(Long menteeId, Long classId);
//}
