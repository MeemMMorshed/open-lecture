package com.openlecture.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id; 
    
    @Column(name="course_day", columnDefinition = "CHAR(10)")
    private String day; 
    private int duration;
    private String campus;
    private String room;
    private String time;
    

}
