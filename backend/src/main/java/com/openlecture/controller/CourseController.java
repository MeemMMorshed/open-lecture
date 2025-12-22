package com.openlecture.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openlecture.service.CourseService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/available")
    public List<String> getAvailableRooms(  
        @RequestParam("day") String day,
        @RequestParam("startTime") String startTime,
        @RequestParam("endTime") String endTime,
        @RequestParam(value = "building", required = false) String building) {
    return courseService.getAvailableRooms(day, startTime, endTime, building);
}





}
