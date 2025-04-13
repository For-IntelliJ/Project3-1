package com.example.demo.service;

import com.example.demo.domain.Category;
import com.example.demo.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends GenericService<Category> {
    public CategoryService(CategoryRepository repository) {
        super(repository);
    }
}
