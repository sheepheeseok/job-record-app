package com.jobrecord.backend.service;

import com.jobrecord.backend.dto.user.SignupRequest;
import com.jobrecord.backend.dto.user.UserResponse;
import com.jobrecord.backend.entity.User;
import com.jobrecord.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Long signup(SignupRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        return userRepository.save(user).getUserId();
    }

    @Transactional
    public User updateProfile(Long userId, String name, String statusMessage) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.updateProfile(name, statusMessage);
        return user;
    }

    public UserResponse getUserProfile(Long userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return UserResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .statusMessage(user.getStatusMessage())
                .build();
    }

    public void issueTempPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자"));

        String tempPassword = generateTempPassword();

        // 콘솔 출력 (임시)
        System.out.println("===== TEMP PASSWORD =====");
        System.out.println("email: " + email);
        System.out.println("password: " + tempPassword);
        System.out.println("=========================");

        // DB 반영 여부 선택
        user.setPassword(passwordEncoder.encode(tempPassword));
    }

    private String generateTempPassword() {
        return UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 10);
    }
}
