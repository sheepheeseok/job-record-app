package com.jobrecord.backend.dto.activity;

import com.jobrecord.backend.enums.ActivityCategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ActivityUpdateRequest {

    @Size(max = 100)
    private String title;

    @Size(max = 500)
    private String description;

    private ActivityCategory category;

    @Min(1)
    private Integer duration;

    private LocalDate activityDate;
}
