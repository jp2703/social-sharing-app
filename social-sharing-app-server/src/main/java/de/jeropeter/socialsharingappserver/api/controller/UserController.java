package de.jeropeter.socialsharingappserver.api.controller;

import de.jeropeter.socialsharingappserver.api.dto.CreateUserDto;
import de.jeropeter.socialsharingappserver.api.response.GenericResponse;
import de.jeropeter.socialsharingappserver.data.model.User;
import de.jeropeter.socialsharingappserver.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity createUser(@RequestBody CreateUserDto user) {
    userService.saveUser(user);
    var response = GenericResponse.create()
        .withMessage("Created user: " + user.getUsername());
    return ResponseEntity.ok(response);
  }
}
