package com.openlecture.service;

import com.openlecture.model.Course;
import com.openlecture.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getCoursesByDay(String day) {
        return courseRepository.findByDay(day);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
}
