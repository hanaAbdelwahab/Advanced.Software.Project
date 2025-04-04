package com.example.swe.demo.Controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProfileController {

    @GetMapping("/profile")
    public String getProfile(Model model) {
        // Mock user data (this would typically come from a database)
        model.addAttribute("username", "KARIM");
        model.addAttribute("bio", "Passionate code reviewer and software architect.");
        model.addAttribute("reviewsCount", 120);
        model.addAttribute("averageRating", 4.8);
        model.addAttribute("profileImage", "/images/profile.png");

        // Mock list of reviews
        List<String> reviews = Arrays.asList(
            "Reviewed a Java Spring Boot project - Great work!",
            "Suggested improvements on a React component structure.",
            "Helped refactor a complex algorithm for better efficiency.",
            "Provided feedback on API security best practices."
        );
        model.addAttribute("reviews", reviews);
        
        return "profile"; // Renders profile.html
    }
}
