package jar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jar.dto.BookingRequestDTO;
import jar.dto.BookingResponseDTO;
import jar.exception.ResourceNotFoundException;
import jar.model.Booking;
import jar.model.Customer;
import jar.model.Room;
import jar.repository.BookingRepository;
import jar.repository.CustomerRepository;
import jar.repository.RoomRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoomRepository roomRepository;

    public BookingResponseDTO createBooking(BookingRequestDTO request) {

        Customer customer = customerRepository
                .findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Room room = roomRepository
                .findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        boolean roomBooked = bookingRepository.existsConflictingBooking(
                request.getRoomId(),
                request.getCheckInDate(),
                request.getCheckOutDate());

        if (roomBooked) {
            throw new RuntimeException("Room already booked for selected dates");
        }

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setRoom(room);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setStatus("CONFIRMED");

        Booking savedBooking = bookingRepository.save(booking);

        BookingResponseDTO response = convertToDTO(savedBooking);

        return response;
    }

    // GET all bookings
    public List<BookingResponseDTO> getAllBookings() {

        return bookingRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // DELETE booking
    public void deleteBooking(Long id) {

        Booking booking = bookingRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        bookingRepository.delete(booking);
    }

    // Convert Booking → DTO
    private BookingResponseDTO convertToDTO(Booking booking) {

        BookingResponseDTO dto = new BookingResponseDTO();

        dto.setBookingId(booking.getBookingId());
        dto.setCustomerName(booking.getCustomer().getName());
        dto.setRoomNumber(booking.getRoom().getRoomNumber());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setStatus(booking.getStatus());

        return dto;
    }
}