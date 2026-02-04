package com.jobrecord.backend.dto.activity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MonthlyReportResponse {
    private List<String> days;
    private List<Long> counts;
}
