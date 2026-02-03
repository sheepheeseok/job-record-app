package com.jobrecord.backend.dto.activity;

import com.jobrecord.backend.enums.ActivityCategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ActivityCreateRequest {

    @NotBlank
    @Size(max = 100)
    private String title;

    @Size(max = 500)
    private String description;

    @NotNull
    private ActivityCategory category;

    @NotNull
    @Min(1)
    private Integer duration;

    @NotNull
    private LocalDate activityDate;
}
