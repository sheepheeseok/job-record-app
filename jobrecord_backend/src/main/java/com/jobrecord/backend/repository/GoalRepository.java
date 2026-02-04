package com.jobrecord.backend.repository;

import com.jobrecord.backend.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    Optional<Goal> findByUser_UserIdAndTitleAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Long userId,
            String title,
            LocalDate date1,
            LocalDate data2
    );
}
