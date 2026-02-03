package com.jobrecord.backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {

    private String AccessToken;
    private Long userId;
    private String email;
}
