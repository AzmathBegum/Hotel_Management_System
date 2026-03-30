package jar.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/external-hotels")
@CrossOrigin(origins = "*") // allow frontend
public class ExternalHotelController {

    @GetMapping
    public String getHotels() {

        String apiKey = "ff9c905d54a862565d14ba113cbe63b1eb4920c5ed766e882a9b4fadef0d9105"; 

        String url = "https://serpapi.com/search.json?engine=google_hotels"
                + "&q=hotels+in+Hyderabad"
                + "&check_in_date=2026-04-01"
                + "&check_out_date=2026-04-02"
                + "&adults=2"
                + "&currency=INR"
                + "&api_key=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}