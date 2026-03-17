package jar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jar.model.ServiceStaff;
import jar.repository.ServiceStaffRepository;

@Service
public class ServiceStaffService {

    @Autowired
    private ServiceStaffRepository serviceStaffRepository;

    public ServiceStaff saveStaff(ServiceStaff staff) {
        return serviceStaffRepository.save(staff);
    }

    public List<ServiceStaff> getAllStaff() {
        return serviceStaffRepository.findAll();
    }
}