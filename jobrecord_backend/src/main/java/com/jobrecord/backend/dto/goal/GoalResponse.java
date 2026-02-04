package com.jobrecord.backend.dto.goal;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GoalResponse {

    private Integer weeklyHours;
    private Integer monthlyDays;
}
