package com.openlecture.repository;

/**
 * Minimal course data needed to calculate room availability.
 */
public interface ScheduledCourse {
    String getRoom();

    String getTime();

    int getDuration();
}
