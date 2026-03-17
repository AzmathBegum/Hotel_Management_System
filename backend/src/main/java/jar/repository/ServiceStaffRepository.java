package jar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jar.model.ServiceStaff;

public interface ServiceStaffRepository extends JpaRepository<ServiceStaff, Long> {

}