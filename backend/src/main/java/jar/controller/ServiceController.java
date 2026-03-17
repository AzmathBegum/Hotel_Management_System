package jar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jar.model.HotelService;
import jar.service.HotelServiceService;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {

    @Autowired
    private HotelServiceService serviceService;

    @PostMapping
    public HotelService addService(@RequestBody HotelService service) {
        return serviceService.saveService(service);
    }

    @GetMapping
    public List<HotelService> getServices() {
        return serviceService.getAllServices();
    }
}