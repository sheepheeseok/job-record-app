package com.jobrecord.backend.repository;

import com.jobrecord.backend.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findAllByUserUserIdAndDeletedAtIsNullOrderByActivityDateDesc(Long userId);

    Optional<Activity> findByActivityIdAndUserUserIdAndDeletedAtIsNull(
            Long activityId,
            Long userId
    );
}
