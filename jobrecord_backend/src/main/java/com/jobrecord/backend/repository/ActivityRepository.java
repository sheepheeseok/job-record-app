package com.jobrecord.backend.repository;

import com.jobrecord.backend.entity.Activity;
import com.jobrecord.backend.repository.projection.DailyActivityCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findAllByUserUserIdAndDeletedAtIsNullOrderByActivityDateDesc(Long userId);

    Optional<Activity> findByActivityIdAndUserUserIdAndDeletedAtIsNull(
            Long activityId,
            Long userId
    );

    @Query("""
        SELECT a.activityDate as date, Count(a) as count
        FROM Activity a
        WHERE a.user.userId = :userId
          AND a.activityDate BETWEEN :startDate AND :endDate
          AND a.deletedAt IS NULL
        GROUP BY a.activityDate
        ORDER BY a.activityDate
""")
    List<DailyActivityCount> findMonthlyCounts(
    @Param("userId") Long userId,
    @Param("startDate") LocalDate startDate,
    @Param("endDate") LocalDate endDate
    );
}
