package de.jeropeter.socialsharingappserver;

import de.jeropeter.socialsharingappserver.api.request.dto.user.CreateUserDto;
import de.jeropeter.socialsharingappserver.data.model.User;
import de.jeropeter.socialsharingappserver.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class SocialSharingAppServerApplication {

  public static void main(String[] args) {
    SpringApplication.run(SocialSharingAppServerApplication.class, args);
  }

  @Bean
  @Profile("!test")
  CommandLineRunner run(UserService userService) {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        for (int i = 1; i <= 15; i++) {
          var user = new CreateUserDto();
          user.setDisplayName("displayName" + i);
          user.setPassword("password");
          user.setUsername("username" + i);
          userService.saveUser(user);
        }
      }
    };
  }
}
