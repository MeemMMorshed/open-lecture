package com.openlecture.repository;
import com.openlecture.model.Course;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// JpaRepository provides CRUD operations and more
@Repository
public interface CourseRepository extends JpaRepository<Course, Long>{
    List<Course> findByDay(String day); // Jpa creates query based on method name
}
