package com.example.demo.service;

import com.example.demo.domain.Apply;
import com.example.demo.domain.User;
import com.example.demo.repository.ApplyRepository;
import com.example.demo.repository.ClassRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplyService extends GenericService<Apply> {

    private final ApplyRepository applyRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;

    @Autowired
    public ApplyService(ApplyRepository applyRepository,
                        ClassRepository classRepository,
                        UserRepository userRepository) {
        super(applyRepository);
        this.applyRepository = applyRepository;
        this.classRepository = classRepository;
        this.userRepository = userRepository;
    }

    /**
     * 클래스 신청 메서드
     * @param classId 신청할 클래스 ID
     * @param menteeId 신청자(멘티) ID
     * @return 생성된 Apply 객체
     * @throws RuntimeException 클래스나 사용자가 존재하지 않거나 중복 신청인 경우
     */
    @Transactional
    public Apply applyToClass(Long classId, Long menteeId) {
        System.out.println("=== ApplyService.applyToClass 시작 ===");
        System.out.println("Class ID: " + classId);
        System.out.println("Mentee ID: " + menteeId);

        // 1. 클래스 존재 확인
        com.example.demo.domain.Class classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("클래스를 찾을 수 없습니다. ID: " + classId));
        System.out.println("클래스 찾기 성공: " + classEntity.getClassname());

        // 2. 사용자 존재 확인
        User mentee = userRepository.findById(menteeId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다. ID: " + menteeId));
        System.out.println("사용자 찾기 성공: " + mentee.getUsername() + ", Role: " + mentee.getRole());

        // 3. 중복 신청 확인
        if (applyRepository.existsByMenteeIdAndClassEntityId(menteeId, classId)) {
            System.out.println("중복 신청 감지!");
            throw new RuntimeException("이미 해당 클래스에 신청하셨습니다.");
        }
        System.out.println("중복 신청 없음 - 진행 가능");

        // 4. Apply 객체 생성 및 저장
        Apply apply = new Apply();
        apply.setClassEntity(classEntity);
        apply.setMentee(mentee);
        apply.setStatus(Apply.ApplyStatus.PENDING);
        apply.setAppliedAt(LocalDateTime.now());

        Apply savedApply = applyRepository.save(apply);
        System.out.println("신청 저장 성공! Apply ID: " + savedApply.getId());

        return savedApply;
    }

    /**
     * 특정 사용자의 신청 목록 조회
     */
    public List<Apply> getAppliesByMentee(Long menteeId) {
        return applyRepository.findByMenteeId(menteeId);
    }

    /**
     * 특정 클래스의 신청 목록 조회
     */
    public List<Apply> getAppliesByClass(Long classId) {
        return applyRepository.findByClassEntityId(classId);
    }

    /**
     * 신청 상태 변경
     */
    @Transactional
    public Apply updateApplyStatus(Long applyId, Apply.ApplyStatus status) {
        Apply apply = applyRepository.findById(applyId)
                .orElseThrow(() -> new RuntimeException("신청을 찾을 수 없습니다. ID: " + applyId));

        apply.setStatus(status);
        return applyRepository.save(apply);
    }
}
