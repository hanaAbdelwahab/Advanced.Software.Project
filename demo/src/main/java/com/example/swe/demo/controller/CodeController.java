package com.example.swe.demo.controller;

import com.example.swe.demo.model.Code;
import com.example.swe.demo.repository.CodeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/codes")
public class CodeController {

    @Autowired
    private CodeRepository codeRepository;

    @PostMapping("/save")
    public ResponseEntity<Code> saveCode(@RequestBody Code code) {
        return ResponseEntity.ok(codeRepository.save(code));
    }
}
