package com.jobrecord.backend.dto.activity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AnalysisSummaryResponse {

    private String tendencyType;

    private Long totalActivities;
    private Long activeDays;
    private Long totalHours;

    private CategoryRatio categoryRatio;

    private Double completionRatio;
    private Double consistencyScore;

    @Getter
    @AllArgsConstructor
    public static class CategoryRatio {
        private Double effort;
        private Double complete;
        private Double explore;
        private Double support;
        private Double feedback;
    }
}
