package jar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jar.dto.BookingRequestDTO;
import jar.dto.BookingResponseDTO;
import jar.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create booking
    @PostMapping
    public BookingResponseDTO createBooking(@Valid @RequestBody BookingRequestDTO request) {
        return bookingService.createBooking(request);
    }

    // Get all bookings
    @GetMapping
    public List<BookingResponseDTO> getBookings() {
        return bookingService.getAllBookings();
    }

    // Delete booking
    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}