package com.jobrecord.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "goal")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id")
    private Long goalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 30)
    private String title;

    @Column(nullable = false)
    private Integer targetCount;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public static Goal create(
            User user,
            String title,
            Integer targetCount,
            LocalDate startDate,
            LocalDate endDate
    ) {
        Goal goal = new Goal();
        goal.user = user;
        goal.title = title;
        goal.targetCount = targetCount;
        goal.startDate = startDate;
        goal.endDate = endDate;
        goal.createdAt = LocalDateTime.now();
        return goal;
    }

    public void updateTarget(Integer targetCount) {
        this.targetCount = targetCount;
    }
}
