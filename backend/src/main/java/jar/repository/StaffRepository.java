package jar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jar.model.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {
}