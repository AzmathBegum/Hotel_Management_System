package jar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jar.model.BookingService;

public interface BookingServiceRepository extends JpaRepository<BookingService, Long> {

}