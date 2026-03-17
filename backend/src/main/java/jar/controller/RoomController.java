package jar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jar.model.Room;
import jar.service.RoomService;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public Room addRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    @GetMapping
    public List<Room> getRooms() {
        return roomService.getAllRooms();
    }
}