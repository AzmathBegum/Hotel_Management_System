package jar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jar.model.HotelService;

public interface HotelServiceRepository extends JpaRepository<HotelService, Long> {

}