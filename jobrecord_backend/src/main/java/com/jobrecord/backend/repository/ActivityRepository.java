package com.jobrecord.backend.repository;

import com.jobrecord.backend.entity.Activity;
import com.jobrecord.backend.repository.projection.CategoryCount;
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

    @Query("""
    SELECT a.category as category, COUNT(a) as count
    FROM Activity a
    WHERE a.user.userId = :userId
      AND a.activityDate BETWEEN :startDate AND :endDate
    GROUP BY a.category
""")
    List<CategoryCount> findCategoryCounts(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );

    @Query("""
    SELECT COUNT(a)
    FROM Activity a
    WHERE a.user.userId = :userId
      AND a.activityDate BETWEEN :startDate AND :endDate
""")
    Long findTotalActivities(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );

    @Query("""
    SELECT COUNT(DISTINCT a.activityDate)
    FROM Activity a
    WHERE a.user.userId = :userId
      AND a.activityDate BETWEEN :startDate AND :endDate
""")
    Long findActiveDays(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );

    @Query("""
    SELECT COALESCE(SUM(a.duration), 0)
    FROM Activity a
    WHERE a.user.userId = :userId
      AND a.activityDate BETWEEN :startDate AND :endDate
""")
    Long findTotalDuration(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );
}
