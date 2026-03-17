package jar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jar.model.Payment;
import jar.service.PaymentService;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    @GetMapping
    public List<Payment> getPayments() {
        return paymentService.getAllPayments();
    }
}