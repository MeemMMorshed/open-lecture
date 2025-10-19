package com.openlecture.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openlecture.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
        @Query("SELECT c FROM Course c WHERE c.day = :day")
        List<Course> findByDay(@Param("day") String day);
}
