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

    @GetMapping("/available")
    public List<String> getAvailableROoms(
            @RequestParam String day,
            @RequestParam String startTime,
            @RequestParam String endTime) {
        return courseService.getAvailableRooms(day, startTime, endTime);
    }




}
