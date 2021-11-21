package de.jeropeter.socialsharingappserver.api.controller;

import de.jeropeter.socialsharingappserver.api.request.annotations.CurrentUser;
import de.jeropeter.socialsharingappserver.api.response.dto.UserLoginResponseDto;
import de.jeropeter.socialsharingappserver.data.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
public class LoginController {
  @PostMapping
  public ResponseEntity login(@CurrentUser User user){
    return ResponseEntity
        .ok(new UserLoginResponseDto()
            .withUsername(user.getUsername())
            .withDisplayName(user.getDisplayName())
            .withImage(user.getImage())
        );
  }
}
