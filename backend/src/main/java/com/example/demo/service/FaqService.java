package com.example.demo.service;

import com.example.demo.domain.Faq;
import com.example.demo.repository.FaqRepository;
import org.springframework.stereotype.Service;

@Service
public class FaqService extends GenericService<Faq> {
    public FaqService(FaqRepository repository) {
        super(repository);
    }
}
