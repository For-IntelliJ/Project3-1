package com.example.demo.service;

import com.example.demo.domain.ClassEntity;
import com.example.demo.repository.ClassRepository;
import org.springframework.stereotype.Service;

@Service
public class ClassService extends GenericService<ClassEntity> {
    public ClassService(ClassRepository repository) {
        super(repository);
    }
}
