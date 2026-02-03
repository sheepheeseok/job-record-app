package com.jobrecord.backend.controller;

import com.jobrecord.backend.dto.user.*;
import com.jobrecord.backend.entity.User;
import com.jobrecord.backend.security.CustomUserDetails;
import com.jobrecord.backend.service.AuthService;
import com.jobrecord.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth/")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("signup")
    @ResponseStatus(HttpStatus.CREATED)
    public SignupResponse signup(
            @RequestBody @Valid SignupRequest request
    ) {
        Long userId = userService.signup(request);
        return new SignupResponse(userId);
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PutMapping("profile")
    public ResponseEntity<?> updateProfile(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody @Valid UpdateProfileRequest request
    ) {
        User updatedUser = userService.updateProfile(
                user.getUserId(),
                request.getName(),
                request.getStatusMessage()
        );

        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("me")
    public UserResponse getMyProfile(@AuthenticationPrincipal CustomUserDetails userDetails){
        return userService.getUserProfile(userDetails.getUserId());
    }

    @PostMapping("temp")
    public ResponseEntity<?> issueTempPassword(@RequestBody TempPasswordRequest request) {
        userService.issueTempPassword(request.getEmail());
        return ResponseEntity.ok(
                Map.of("message", "임시 비밀번호가 발급되었습니다.")
        );
    }
 }
