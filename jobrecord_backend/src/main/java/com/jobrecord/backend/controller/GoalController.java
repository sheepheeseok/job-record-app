package com.jobrecord.backend.controller;

import com.jobrecord.backend.dto.goal.GoalRequest;
import com.jobrecord.backend.dto.goal.GoalResponse;
import com.jobrecord.backend.security.CustomUserDetails;
import com.jobrecord.backend.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    @GetMapping("/current")
    public ResponseEntity<GoalResponse> getCurrentGoals(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(
                goalService.getCurrentGoals(userDetails.getUserId())
        );
    }

    @PostMapping
    public ResponseEntity<Void> saveGoals(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody GoalRequest request
    ) {
            goalService.saveGoals(userDetails.getUserId(), request);
            return ResponseEntity.ok().build();
    }
}
