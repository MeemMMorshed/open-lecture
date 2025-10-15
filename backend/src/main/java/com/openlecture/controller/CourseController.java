package com.openlecture.controller;

import com.openlecture.model.Course;
import com.openlecture.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{day}")
    public List<Course> getCoursesByDay(@PathVariable String day) {
        return courseService.getCoursesByDay(day);
    }
}
