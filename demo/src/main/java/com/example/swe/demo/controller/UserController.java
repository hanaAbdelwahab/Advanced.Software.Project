package com.example.swe.demo.controller;

import com.example.swe.demo.model.User;
import com.example.swe.demo.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Serve the combined auth page (login + register)
    @GetMapping("/")
    public String showAuthPage(Model model) {
        model.addAttribute("user", new User());
        return "auth";
    }

    @PostMapping("/register")
    public String register(@ModelAttribute User user, Model model) {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
        model.addAttribute("message", "Registration successful! You can now log in.");
        return "auth";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute User user, Model model) {
        User foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser != null && BCrypt.checkpw(user.getPassword(), foundUser.getPassword())) {
            model.addAttribute("username", foundUser.getUsername());
            return "welcome"; // Redirect to welcome.html
        }
        model.addAttribute("error", "Invalid username or password.");
        return "auth";
    }
}
