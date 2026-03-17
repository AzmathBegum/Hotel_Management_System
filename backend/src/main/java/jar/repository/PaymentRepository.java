package jar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jar.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}