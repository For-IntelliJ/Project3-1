package com.example.demo.service;

import com.example.demo.domain.Board;
import com.example.demo.repository.BoardRepository;
import org.springframework.stereotype.Service;

@Service
public class BoardService extends GenericService<Board> {
    public BoardService(BoardRepository repository) {
        super(repository);
    }
}
