package jar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableMethodSecurity
public class DemoApplication {
		public static void main(String[] args) {
		
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
		dotenv.entries().forEach(e -> System.setProperty(e.getKey(), e.getValue()));

		SpringApplication.run(DemoApplication.class, args);
	}

}