package jar.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jar.model.Room;
import jar.repository.RoomRepository;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
    return roomRepository.findAll();
}

}