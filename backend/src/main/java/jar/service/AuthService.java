package jar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jar.config.JwtUtil;
import jar.dto.LoginResponse;
import jar.model.Role;
import jar.model.User;
import jar.repository.UserRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(User user)
    {
        if (userRepository.findByEmail(user.getEmail()).isPresent())
        {
            throw new RuntimeException("Email Already Registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null)
        {
            user.setRole(Role.ROLE_CUSTOMER);
        }

        userRepository.save(user);
        return "User Registered Successfully";
    }

    @Autowired
    private JwtUtil jwtUtil;
    public LoginResponse login(String email, String password){
        User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Invalid Email or Password"));
        if (!passwordEncoder.matches(password, user.getPassword()))
        {
            throw new RuntimeException("Invalid Email or Password");
        }
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new LoginResponse(token, user.getRole().name());
}
}
