package com.jobrecord.backend.dto.activity;

import com.jobrecord.backend.entity.Activity;
import com.jobrecord.backend.enums.ActivityCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class ActivityResponse {

    private Long acitivityId;
    private String title;
    private ActivityCategory category;
    private LocalDate acitivityDAte;
    private Integer duration;

    public static ActivityResponse from(Activity activity) {
        return new ActivityResponse(
                activity.getActivityId(),
                activity.getTitle(),
                activity.getCategory(),
                activity.getActivityDate(),
                activity.getDuration()
        );
    }
}
