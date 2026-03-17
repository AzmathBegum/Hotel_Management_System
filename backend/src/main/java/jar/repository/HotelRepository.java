package jar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jar.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

}