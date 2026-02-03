package com.jobrecord.backend.service;

import com.jobrecord.backend.dto.activity.*;
import com.jobrecord.backend.entity.Activity;
import com.jobrecord.backend.entity.User;
import com.jobrecord.backend.repository.ActivityRepository;
import com.jobrecord.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    public List<ActivityListResponse> getMyActivities (Long userId) {

        return activityRepository
                .findAllByUserUserIdAndDeletedAtIsNullOrderByActivityDateDesc(userId)
                .stream()
                .map(a -> new ActivityListResponse(
                        a.getActivityId(),
                        a.getTitle(),
                        a.getCategory(),
                        a.getDuration(),
                        a.getActivityDate()
                ))
                .toList();
    }

    public ActivityDetailResponse getActivityDetail(
            Long userId,
            Long activityId
    ) {

        Activity activity = activityRepository
                .findByActivityIdAndUserUserIdAndDeletedAtIsNull(activityId, userId)
                .orElseThrow(() ->
                        new RuntimeException("활동을 찾을 수 없습니다.")
                );

        return new ActivityDetailResponse(
                activity.getActivityId(),
                activity.getTitle(),
                activity.getDescription(),
                activity.getCategory(),
                activity.getDuration(),
                activity.getActivityDate(),
                activity.getCreatedAt(),
                activity.getUpdatedAt()
        );
    }

    public ActivityResponse addActivity (
            Long userId,
            ActivityCreateRequest request
    ) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Activity activity = Activity.create(user, request);
        Activity saved = activityRepository.save(activity);

        return ActivityResponse.from(saved);
    }

    public ActivityResponse updateActivity(
            Long userId,
            Long activityId,
            ActivityUpdateRequest request
    ) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new IllegalArgumentException("활동 없음"));

        if (!activity.getUser().getUserId().equals(userId)) {
            throw new AccessDeniedException("수정 권한 없음");
        }

        activity.update(request);

        return ActivityResponse.from(activity);
    }

    @Transactional
    public void deleteActivity(Long userId, Long activityId) {
        Activity activity = activityRepository
                .findByActivityIdAndUserUserIdAndDeletedAtIsNull(activityId, userId)
                .orElseThrow(() -> new IllegalArgumentException("활동 없음"));

        activity.delete();
    }
}
