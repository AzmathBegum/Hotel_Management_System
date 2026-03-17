package jar.controller;

import org.springframework.web.bind.annotation.*;

import jar.dto.LoginRequest;
import jar.dto.LoginResponse;
import jar.model.User;
import jar.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")  
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService)
    {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user)
    {
        return authService.register(user);
    }

    @PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest loginRequest)
{
    System.out.println("Login API called");
    return authService.login(loginRequest.getEmail(), loginRequest.getPassword());
}
}