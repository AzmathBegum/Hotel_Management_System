package jar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jar.model.Hotel;
import jar.service.HotelService;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @PostMapping
    public Hotel addHotel(@RequestBody Hotel hotel) {
        return hotelService.saveHotel(hotel);
    }

    @GetMapping
    public List<Hotel> getHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/{id}")
    public Hotel getHotel(@PathVariable Long id) {
        return hotelService.getHotelById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return "Hotel deleted successfully";
    }
}