package com.jobrecord.backend.dto.activity;

import com.jobrecord.backend.enums.ActivityCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ActivityDetailResponse {

    private Long activityId;
    private String title;
    private String description;
    private ActivityCategory category;
    private Integer duration;
    private LocalDate activityDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
