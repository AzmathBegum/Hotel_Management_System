package jar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jar.model.BookingService;
import jar.repository.BookingServiceRepository;

@Service
public class BookingServiceService {

    @Autowired
    private BookingServiceRepository bookingServiceRepository;

    public BookingService saveBookingService(BookingService bookingService) {
        return bookingServiceRepository.save(bookingService);
    }

    public List<BookingService> getAllBookingServices() {
        return bookingServiceRepository.findAll();
    }
}