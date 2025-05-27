package com.example.swe.demo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class EditorController {

    @GetMapping("/editor")
    public String showEditorPage() {
        // This returns templates/editor.html (without .html extension)
        return "editor";
    }
}