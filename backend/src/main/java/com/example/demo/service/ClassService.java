package com.example.demo.service;

import com.example.demo.domain.Class;
import com.example.demo.domain.Category;
import com.example.demo.domain.Region;
import com.example.demo.domain.User;
import com.example.demo.repository.ClassRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.RegionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService extends GenericService<Class> {

    private final CategoryRepository categoryRepository;
    private final RegionRepository regionRepository;
    private final UserRepository userRepository;

    public ClassService(ClassRepository classRepository,
                        CategoryRepository categoryRepository,
                        RegionRepository regionRepository,
                        UserRepository userRepository) {
        super(classRepository);
        this.categoryRepository = categoryRepository;
        this.regionRepository = regionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void save(Class classEntity) {
        // (1) 카테고리 설정
        Long categoryId = classEntity.getCategory() != null ? classEntity.getCategory().getId() : null;
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다."));
        classEntity.setCategory(category);

        // (2) 지역 설정
        Long regionId = classEntity.getRegion() != null ? classEntity.getRegion().getId() : null;
        Region region = regionRepository.findById(regionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 지역입니다."));
        classEntity.setRegion(region);

        // (3) 멘토 설정 (임시: id=1)
        User mento = userRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 멘토입니다."));
        classEntity.setMento(mento);

        // (4) 저장
        repository.save(classEntity);
    }

    public List<Class> findAll() {
        return repository.findAll();
    }

    public Class findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 클래스를 찾을 수 없습니다. id=" + id));
    }
}
