package com.example.demo.service;

import com.example.demo.domain.ClassLike;
import com.example.demo.repository.ClassLikeRepository;
import org.springframework.stereotype.Service;

@Service
public class ClassLikeService extends GenericService<ClassLike> {
    public ClassLikeService(ClassLikeRepository repository) {
        super(repository);
    }
}
