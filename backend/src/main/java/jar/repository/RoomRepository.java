package jar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jar.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

}