package com.openlecture.config;

import com.openlecture.model.Room;
import com.openlecture.repository.RoomRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//Configuration
public class RoomDataInitializer {
    @Bean
    CommandLineRunner seedRooms(RoomRepository roomRepository) {
        return args -> {
            if (roomRepository.count() != 0) {
                return;
            }

            roomRepository.saveAll(List.of(
                room("ACW", "ACW 104"), room("ACW", "ACW 206"), room("ACW", "ACW 307"),
                room("ACE", "ACE 102"), room("ACE", "ACE 204"), room("ACE", "ACE 304"),
                room("ATK", "ATK 101"), room("ATK", "ATK 203"),
                room("BRG", "BRG 115"), room("BRG", "BRG 208"),
                room("CB", "CB 112"), room("CB", "CB 214"),
                room("CLH", "CLH A"), room("CLH", "CLH B"),
                room("CSQ", "CSQ 101"), room("CSQ", "CSQ 201"),
                room("LAS", "LAS 1002"), room("LAS", "LAS 1004"),
                room("LSB", "LSB 105"), room("LSB", "LSB 201"),
                room("PSE", "PSE 201"), room("PSE", "PSE 304"),
                room("R", "R N101"), room("R", "R S101"),
                room("SLH", "SLH A"), room("SLH", "SLH B"),
                room("VC", "VC 115"), room("VC", "VC 206"),
                room("VH", "VH 115"), room("VH", "VH 212")
            ));
        };
    }

    private Room room(String building, String name) {
        return Room.builder().building(building).name(name).build();
    }
}
