package com.openlecture.service;

import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.openlecture.model.Course;
import com.openlecture.repository.CourseRepository;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<String> getAvailableRooms(String day, String startTime, String endTime) {
        LocalTime start = LocalTime.parse(startTime);
        LocalTime end = LocalTime.parse(endTime);

        List<Course> allCourses = courseRepository.findByDay(day);

        Set<String> busyRooms = allCourses.stream().filter(course -> {
            LocalTime courseStart = LocalTime.parse(course.getTime());
            LocalTime courseEnd = courseStart.plusMinutes(course.getDuration());
            return courseStart.isBefore(end) && courseEnd.isAfter(start);
        }).map(Course::getRoom).collect(Collectors.toSet());

        Set<String> allRooms = allCourses.stream().map(Course::getRoom).collect(Collectors.toSet());

        return allRooms.stream().filter(room -> !busyRooms.contains(room)).sorted().collect(Collectors.toList());
    }

}
