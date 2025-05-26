package com.example.demo.service;

import com.example.demo.domain.Region;
import com.example.demo.repository.RegionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionService extends GenericService<Region> {

    public RegionService(RegionRepository regionRepository) {
        super(regionRepository);
    }

    public List<Region> findAll() {
        return repository.findAll();
    }

    public Region findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 지역을 찾을 수 없습니다. id=" + id));
    }
}
