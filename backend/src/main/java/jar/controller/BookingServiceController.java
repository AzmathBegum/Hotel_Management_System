package jar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jar.model.BookingService;
import jar.service.BookingServiceService;

@RestController
@RequestMapping("/booking-services")
public class BookingServiceController {

    @Autowired
    private BookingServiceService bookingServiceService;

    @PostMapping
    public BookingService addServiceToBooking(@RequestBody BookingService bookingService) {
        return bookingServiceService.saveBookingService(bookingService);
    }

    @GetMapping
    public List<BookingService> getBookingServices() {
        return bookingServiceService.getAllBookingServices();
    }
}