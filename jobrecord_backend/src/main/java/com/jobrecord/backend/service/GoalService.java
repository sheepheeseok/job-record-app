package com.jobrecord.backend.service;

import com.jobrecord.backend.dto.goal.GoalRequest;
import com.jobrecord.backend.dto.goal.GoalResponse;
import com.jobrecord.backend.entity.Goal;
import com.jobrecord.backend.entity.User;
import com.jobrecord.backend.repository.GoalRepository;
import com.jobrecord.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalResponse getCurrentGoals(Long userId) {
        LocalDate today = LocalDate.now();

        LocalDate weekStart = today.with (DayOfWeek.MONDAY);
        LocalDate weekEnd = today.with(DayOfWeek.SUNDAY);


        LocalDate monthStart = today.withDayOfMonth(1);
        LocalDate monthEnd = today.withDayOfMonth(today.lengthOfMonth());

        Integer weeklyHours = goalRepository
                .findByUser_UserIdAndTitleAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                        userId,
                        "WEEKLY_HOURS",
                        weekStart,
                        weekEnd
                )
                .map(Goal::getTargetCount)
                .orElse(null);
    Integer monthlyDays = goalRepository
            .findByUser_UserIdAndTitleAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                    userId,
                    "MONTHLY_DAYS",
                    monthStart,
                    monthEnd
            )
            .map(Goal::getTargetCount)
            .orElse(null);


        return new GoalResponse(weeklyHours, monthlyDays);
    }

    @Transactional
    public void saveGoals(Long userId, GoalRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        LocalDate today = LocalDate.now();

        // 주간 기간
        LocalDate weekStart = today.with(DayOfWeek.MONDAY);
        LocalDate weekEnd = today.with(DayOfWeek.SUNDAY);

        // 월간 기간
        LocalDate monthStart = today.withDayOfMonth(1);
        LocalDate monthEnd = today.withDayOfMonth(today.lengthOfMonth());

        // 주간 목표
        if (request.getWeeklyHours() != null) {
            upsertGoal(
                    user,
                    "WEEKLY_HOURS",
                    request.getWeeklyHours(),
                    weekStart,
                    weekEnd
            );
        }

        // 월간 목표
        if (request.getMonthlyDays() != null) {
            upsertGoal(
                    user,
                    "MONTHLY_DAYS",
                    request.getMonthlyDays(),
                    monthStart,
                    monthEnd
            );
        }
    }

    private void upsertGoal(
            User user,
            String title,
            Integer targetCount,
            LocalDate startDate,
            LocalDate endDate
    ) {
        goalRepository
                .findByUser_UserIdAndTitleAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                        user.getUserId(),
                        title,
                        startDate,
                        endDate
                )
                .ifPresentOrElse(
                        goal -> goal.updateTarget(targetCount),
                        () -> goalRepository.save(
                                Goal.create(
                                        user,
                                        title,
                                        targetCount,
                                        startDate,
                                        endDate
                                )
                        )
                );
    }
}
