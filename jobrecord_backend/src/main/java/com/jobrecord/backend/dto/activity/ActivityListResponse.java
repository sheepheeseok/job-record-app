package com.jobrecord.backend.dto.activity;

import com.jobrecord.backend.enums.ActivityCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class ActivityListResponse {

    private Long activityId;
    private String title;
    private ActivityCategory category;
    private Integer duration;
    private LocalDate activityDate;
}
