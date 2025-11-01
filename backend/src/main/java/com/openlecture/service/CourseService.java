package com.openlecture.service;

import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

import com.openlecture.model.Course;
import com.openlecture.repository.CourseRepository;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<String> getAvailableRooms(String day, String startTime, String endTime, String building) {
        LocalTime start = LocalTime.parse(startTime);
        LocalTime end = LocalTime.parse(endTime);

        List<Course> allCourses = (building == null || building.isEmpty()) ? courseRepository.findByDay(day)
                : courseRepository.findByDayAndRoomStartingWith(day, building);

                Set<String> busyRooms = allCourses.stream().filter(course -> {
                    try {
                        DateTimeFormatter flexibleTimeFormatter = DateTimeFormatter.ofPattern("[H:mm[:ss]][HH:mm[:ss]]");

                        LocalTime courseStart = LocalTime.parse(course.getTime(), flexibleTimeFormatter);
                        LocalTime courseEnd = courseStart.plusMinutes(course.getDuration());

                        return courseStart.isBefore(end) && courseEnd.isAfter(start);
                    } catch (Exception e) {
                        System.out.println("Skipping invalid time format: " + course.getTime());
                        return false;
                    }
                }).map(Course::getRoom).collect(Collectors.toSet());


        Set<String> allRooms = allCourses.stream().map(Course::getRoom).collect(Collectors.toSet());

        return allRooms.stream().filter(room -> !busyRooms.contains(room)).sorted().collect(Collectors.toList());
    }

}