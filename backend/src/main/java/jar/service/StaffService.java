package jar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jar.model.Staff;
import jar.repository.StaffRepository;

import java.util.List;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public Staff saveStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }
}