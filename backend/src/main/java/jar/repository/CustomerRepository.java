package jar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jar.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}