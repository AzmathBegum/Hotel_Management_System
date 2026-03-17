package jar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jar.model.Staff;
import jar.service.StaffService;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:5173")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PostMapping
    public Staff addStaff(@RequestBody Staff staff) {
        return staffService.saveStaff(staff);
    }

    @GetMapping
    public List<Staff> getStaff() {
        return staffService.getAllStaff();
    }

    @DeleteMapping("/{id}")
    public void deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
    }
}