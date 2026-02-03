package com.jobrecord.backend.service;

import com.jobrecord.backend.config.JwtTokenProvider;
import com.jobrecord.backend.dto.user.LoginRequest;
import com.jobrecord.backend.dto.user.LoginResponse;
import com.jobrecord.backend.entity.User;
import com.jobrecord.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("로그인 실패"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("로그인 실패");
        }

        String token = jwtTokenProvider.createToken(user.getUserId());

        return new LoginResponse(token, user.getUserId(), user.getEmail());
    }
}
