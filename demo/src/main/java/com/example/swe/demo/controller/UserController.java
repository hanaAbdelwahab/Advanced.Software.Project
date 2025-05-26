    package com.example.swe.demo.controller;

    import com.example.swe.demo.model.User;
    import com.example.swe.demo.repository.UserRepository;

    import jakarta.servlet.http.HttpSession;

    import org.mindrot.jbcrypt.BCrypt;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Controller;
    import org.springframework.ui.Model;
    import org.springframework.web.bind.annotation.*;

    @Controller
    public class UserController {

        @Autowired
        private UserRepository userRepository;
        @GetMapping("/navbar")
        public String getNavbar() {
            return "navbar"; // returns navbar.html from templates
        }
        @GetMapping("/")
        public String showCodeListPage() {
        return "LandingPage"; // Ensure landingpage.html exists in src/main/resources/templates/
        }
        // Serve the combined auth page (login + register)
    
        @GetMapping("/auth")
        public String showAuthPage() {
        return "auth"; // Ensure landingpage.html exists in src/main/resources/templates/
        }

        @GetMapping("/profile")
        public String showProfilePage() {
        return "profilee"; // Ensure landingpage.html exists in src/main/resources/templates/
        }
        @PostMapping("/register")
        public String register(@ModelAttribute User user, Model model) {
            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
            userRepository.save(user);
            model.addAttribute("message", "Registration successful! You can now log in.");
            return "auth";
        }

        @PostMapping("/login")
        public String login(@ModelAttribute User user, Model model, HttpSession session) {
            User foundUser = userRepository.findByUsername(user.getUsername());
            if (foundUser != null && BCrypt.checkpw(user.getPassword(), foundUser.getPassword())) {
        
                session.setAttribute("username", foundUser.getUsername());
        
                // ✅ Let's say 'Pro' or 'Free' is stored in foundUser.getPlan()
                session.setAttribute("userPlan", foundUser.getPlan());
                session.setAttribute("email", foundUser.getEmail());
                model.addAttribute("username", foundUser.getUsername());
                return "Dashboard";
            }
        
            model.addAttribute("error", "Invalid username or password.");
            return "auth";
        }
        @GetMapping("/Dashboard")
        public String showDashboardPage() {
        return "Dashboard"; // Ensure landingpage.html exists in src/main/resources/templates/
        }
        @GetMapping("/CodeList")
        public String showCodePage() {
        return "CodeList"; // Ensure landingpage.html exists in src/main/resources/templates/
        }


        @GetMapping("/settings")
        public String showIndexPage() {
        return "settings"; // Ensure landingpage.html exists in src/main/resources/templates/
        }
      
    }
