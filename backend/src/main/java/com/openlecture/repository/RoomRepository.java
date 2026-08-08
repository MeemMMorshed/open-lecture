package com.openlecture.repository;

import com.openlecture.model.Room;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByBuilding(String building);
}
