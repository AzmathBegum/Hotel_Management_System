package jar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jar.model.ServiceStaff;
import jar.service.ServiceStaffService;

@RestController
@RequestMapping("/staff")
public class ServiceStaffController {

    @Autowired
    private ServiceStaffService serviceStaffService;

    @PostMapping
    public ServiceStaff addStaff(@RequestBody ServiceStaff staff) {
        return serviceStaffService.saveStaff(staff);
    }

    @GetMapping
    public List<ServiceStaff> getStaff() {
        return serviceStaffService.getAllStaff();
    }
}