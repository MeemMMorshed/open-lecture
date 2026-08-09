package com.openlecture.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<com.openlecture.model.Course, Long> {

    @Query("""
            SELECT c.room AS room, c.time AS time, c.duration AS duration
            FROM Course c
            WHERE c.day = :day
            """)
    List<ScheduledCourse> findScheduleByDay(@Param("day") String day);

    @Query("""
            SELECT c.room AS room, c.time AS time, c.duration AS duration
            FROM Course c
            WHERE c.day = :day AND c.room LIKE CONCAT(:building, '%')
            """)
    List<ScheduledCourse> findScheduleByDayAndRoomStartingWith(
            @Param("day") String day,
            @Param("building") String building
    );
}
