package com.example.swe.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.swe.demo.model.User;
import com.example.swe.demo.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {
    private static final String PRO_PLAN = "Pro";
    private static final String FREE_PLAN = "Free";

    @Autowired
    private UserRepository userRepository;

    // Helper method to set session attributes
    private void setUserSessionAttributes(HttpSession session, User user) {
        session.setAttribute("username", user.getUsername());
        session.setAttribute("userPlan", user.getPlan());
        session.setAttribute("isProUser", PRO_PLAN.equals(user.getPlan()));
        session.setAttribute("email", user.getEmail());
        session.setAttribute("userId", user.getId());
    }

    // View mappings
    @GetMapping("/navbar")
    public String getNavbar() {
        return "navbar";
    }

    @GetMapping("/")
    public String showCodeListPage() {
        return "LandingPage";
    }

    @GetMapping("/auth")
    public String showAuthPage() {
        return "auth";
    }

    // Authentication endpoints
    @PostMapping("/register")
    public String register(@ModelAttribute User user, Model model) {
        if (user.getPlan() == null) {
            user.setPlan(FREE_PLAN);
        }
        
        if (user.getPassword().length() < 8) {
            model.addAttribute("error", "Password must be at least 8 characters long.");
            return "auth";
        }
        
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
        model.addAttribute("message", "Registration successful! You can now log in.");
        return "auth";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute User user, Model model, HttpSession session) {
        User foundUser = userRepository.findByUsername(user.getUsername());

        if (foundUser != null && BCrypt.checkpw(user.getPassword(), foundUser.getPassword())) {
            setUserSessionAttributes(session, foundUser);
            return "redirect:/Dashboard";
        }

        model.addAttribute("error", "Invalid username or password.");
        return "auth";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/auth";
    }

    // User management
    @PostMapping("/upgrade-to-pro")
    public String upgradeToPro(HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username != null) {
            User user = userRepository.findByUsername(username);
            if (user != null) {
                user.setPlan(PRO_PLAN);
                userRepository.save(user);
                setUserSessionAttributes(session, user);
            }
        }
        return "redirect:/profile";
    }

    // Protected pages
    @GetMapping("/Dashboard")
    public String showDashboardPage(HttpSession session, Model model) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("userPlan", session.getAttribute("userPlan"));
        model.addAttribute("isProUser", session.getAttribute("isProUser"));
        return "Dashboard";
    }

    @GetMapping("/CodeList")
    public String showCodePage(HttpSession session, Model model) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("userPlan", session.getAttribute("userPlan"));
        model.addAttribute("isProUser", session.getAttribute("isProUser"));
        return "CodeList";
    }

    @GetMapping("/profile")
    public String showProfilePage(HttpSession session, Model model) {
        model.addAttribute("username", session.getAttribute("username"));
        model.addAttribute("email", session.getAttribute("email"));
        model.addAttribute("userPlan", session.getAttribute("userPlan"));
        model.addAttribute("isProUser", session.getAttribute("isProUser"));
        return "profilee";
    }

    // API endpoints
    @GetMapping("/api/code/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, String>> getCodeContent(@PathVariable String id, HttpSession session) {
        Boolean isProUser = (Boolean) session.getAttribute("isProUser");
        Map<String, String> response = new HashMap<>();

        if (isProUser == null || !isProUser) {
            response.put("error", "Access Denied. This code is for PRO users only.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        switch (id) {
            case "color-picker":
                response.put("html", "<div class=\"color-picker-pro-html\">... Actual PRO HTML ...</div>");
                response.put("css", ".color-picker-pro-css { /* Actual PRO CSS */ }");
                response.put("js", "/* Actual PRO JavaScript */");
                break;
            case "weather":
                response.put("html", "<div class=\"weather-pro-html\">... Actual PRO HTML ...</div>");
                response.put("css", ".weather-pro-css { /* Actual PRO CSS */ }");
                response.put("js", "/* Actual PRO JavaScript */");
                break;
            case "form":
                response.put("html", "<div class=\"form-pro-html\">... Actual PRO HTML ...</div>");
                response.put("css", ".form-pro-css { /* Actual PRO CSS */ }");
                response.put("js", "/* Actual PRO JavaScript */");
                break;
            default:
                response.put("error", "Code example with ID '" + id + "' not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
    private Map<String, Boolean> getCodeAccessMap() {
    Map<String, Boolean> codeAccess = new HashMap<>();
    codeAccess.put("color-picker", true);  // Pro
    codeAccess.put("weather", true);       // Pro
    codeAccess.put("form", true);          // Pro
    codeAccess.put("calculator", false);   // Free
    codeAccess.put("todo-list", false);    // Free
    return codeAccess;
}

}