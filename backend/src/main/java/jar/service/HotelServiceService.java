package jar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jar.model.HotelService;
import jar.repository.HotelServiceRepository;

@Service
public class HotelServiceService {

    @Autowired
    private HotelServiceRepository hotelServiceRepository;

    public HotelService saveService(HotelService service) {
        return hotelServiceRepository.save(service);
    }

    public List<HotelService> getAllServices() {
        return hotelServiceRepository.findAll();
    }
}