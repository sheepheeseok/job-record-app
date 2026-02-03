package com.jobrecord.backend.controller;

import com.jobrecord.backend.dto.activity.*;
import com.jobrecord.backend.security.CustomUserDetails;
import com.jobrecord.backend.service.ActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping
    public ResponseEntity<List<ActivityListResponse>> getMyActivities(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(
                activityService.getMyActivities(userDetails.getUserId())
        );
    }

    @GetMapping("/{activityId}")
    public ResponseEntity<ActivityDetailResponse> getAcitivityDetail(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("activityId") Long activityId
    ) {
        return ResponseEntity.ok(
                activityService.getActivityDetail(userDetails.getUserId(), activityId)
        );
    }

    @PostMapping
    public ResponseEntity<ActivityResponse> addActivity(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody @Valid ActivityCreateRequest request
    ) {
        ActivityResponse response =
                activityService.addActivity(userDetails.getUserId(), request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("{activityId}")
    public ResponseEntity<ActivityResponse> updateActivity(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("activityId") Long activityId,
            @RequestBody @Valid ActivityUpdateRequest request
    ) {
        ActivityResponse response =
                activityService.updateActivity(
                        userDetails.getUserId(),
                        activityId,
                        request
                );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{activityId}")
    public ResponseEntity<Void> deleteActivity(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("activityId") Long activityId
    ) {
        activityService.deleteActivity(userDetails.getUserId(), activityId);
        return ResponseEntity.noContent().build();
    }
}
