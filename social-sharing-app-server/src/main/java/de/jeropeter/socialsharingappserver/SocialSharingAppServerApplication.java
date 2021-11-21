package de.jeropeter.socialsharingappserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class SocialSharingAppServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocialSharingAppServerApplication.class, args);
	}

}
