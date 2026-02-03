package com.jobrecord.backend.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TempPasswordRequest {
    private String email;
}
