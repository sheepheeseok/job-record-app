package com.jobrecord.backend.repository.projection;

import java.time.LocalDate;

public interface DailyActivityCount {
    LocalDate getDate();
    Long getCount();
}
