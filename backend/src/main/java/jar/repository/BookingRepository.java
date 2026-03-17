package jar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jar.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("""
           SELECT COUNT(b) > 0
           FROM Booking b
           WHERE b.room.roomId = :roomId
           AND b.checkOutDate > :checkIn
           AND b.checkInDate < :checkOut
           """)
    boolean existsConflictingBooking(
            @Param("roomId") Long roomId,
            @Param("checkIn") java.time.LocalDate checkIn,
            @Param("checkOut") java.time.LocalDate checkOut);
}