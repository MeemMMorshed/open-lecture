package com.openlecture.service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.openlecture.repository.CourseRepository;
import com.openlecture.repository.RoomRepository;
import com.openlecture.repository.ScheduledCourse;

@Service
public class CourseService {
    private static final DateTimeFormatter TIME_FORMATTER =
            DateTimeFormatter.ofPattern("[H:mm[:ss]][HH:mm[:ss]]");

    private final CourseRepository courseRepository;
    private final RoomRepository roomRepository;

    public CourseService(CourseRepository courseRepository, RoomRepository roomRepository) {
        this.courseRepository = courseRepository;
        this.roomRepository = roomRepository;
    }

    public List<String> getAvailableRooms(String day, String startTime, String endTime, String building) {
        LocalTime start = LocalTime.parse(startTime);
        LocalTime end = LocalTime.parse(endTime);

        boolean hasBuilding = building != null && !building.isEmpty();
        List<ScheduledCourse> scheduledCourses = hasBuilding
                ? courseRepository.findScheduleByDayAndRoomStartingWith(day, building)
                : courseRepository.findScheduleByDay(day);

        Set<String> busyRooms = scheduledCourses.stream().filter(course -> {
                    try {
                        LocalTime courseStart = LocalTime.parse(course.getTime(), TIME_FORMATTER);
                        LocalTime courseEnd = courseStart.plusMinutes(course.getDuration());

                        return courseStart.isBefore(end) && courseEnd.isAfter(start);
                    } catch (Exception e) {
                        System.out.println("Skipping invalid time format: " + course.getTime());
                        return false;
                    }
                }).map(ScheduledCourse::getRoom).collect(Collectors.toSet());


        Set<String> allRooms = (hasBuilding
                ? roomRepository.findNamesByBuilding(building)
                : roomRepository.findAllNames())
                .stream().collect(Collectors.toSet());

        return allRooms.stream().filter(room -> !busyRooms.contains(room)).sorted().collect(Collectors.toList());
    }

}
