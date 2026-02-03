package com.jobrecord.backend.dto.user;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponse {

    private Long userId;
    private String name;
    private String email;
    private String statusMessage;
}
