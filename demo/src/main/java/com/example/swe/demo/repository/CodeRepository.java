package com.example.swe.demo.repository;

import com.example.swe.demo.model.Code;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeRepository extends JpaRepository<Code, Long> {
}
