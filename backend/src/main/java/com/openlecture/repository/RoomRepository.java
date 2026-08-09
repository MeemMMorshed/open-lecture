package com.openlecture.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface RoomRepository extends JpaRepository<com.openlecture.model.Room, Long> {
    @Query("SELECT r.name FROM Room r")
    List<String> findAllNames();

    @Query("SELECT r.name FROM Room r WHERE r.building = :building")
    List<String> findNamesByBuilding(@Param("building") String building);
}
