package com.jobrecord.backend.entity;

import com.jobrecord.backend.dto.activity.ActivityCreateRequest;
import com.jobrecord.backend.dto.activity.ActivityUpdateRequest;
import com.jobrecord.backend.enums.ActivityCategory;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ActivityCategory category;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    private LocalDate activityDate;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column
    private LocalDateTime deletedAt;

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }

    public boolean isDeleted() {
        return deletedAt != null;
    }

    @PrePersist
    private void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    private void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public static Activity create(User user, ActivityCreateRequest request) {
        Activity activity = new Activity();
        activity.user = user;
        activity.title = request.getTitle();
        activity.description = request.getDescription();
        activity.category = request.getCategory();
        activity.duration = request.getDuration();
        activity.activityDate = request.getActivityDate();
        return activity;
    }

    public void update(ActivityUpdateRequest request) {

        if (request.getTitle() != null) {
            this.title = request.getTitle();
        }

        if (request.getDescription() != null) {
            this.description = request.getDescription();
        }

        if (request.getCategory() != null) {
            this.category = request.getCategory();
        }

        if (request.getDuration() != null) {
            this.duration = request.getDuration();
        }

        if (request.getActivityDate() != null) {
            this.activityDate = request.getActivityDate();
        }
    }
}
