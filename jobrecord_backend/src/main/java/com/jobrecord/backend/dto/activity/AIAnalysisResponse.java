package com.jobrecord.backend.dto.activity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AIAnalysisResponse {

    private String summary;
    private String feedback;
    private String recommendation;
}
