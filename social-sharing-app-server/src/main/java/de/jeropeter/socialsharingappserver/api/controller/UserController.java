package de.jeropeter.socialsharingappserver.api.controller;

import de.jeropeter.socialsharingappserver.api.request.annotations.CurrentUser;
import de.jeropeter.socialsharingappserver.api.request.dto.user.CreateUserDto;
import de.jeropeter.socialsharingappserver.api.error.ApiError;
import de.jeropeter.socialsharingappserver.api.response.GenericResponse;
import de.jeropeter.socialsharingappserver.data.model.User;
import de.jeropeter.socialsharingappserver.service.UserService;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity createUser(@Valid @RequestBody CreateUserDto user) {
    userService.saveUser(user);
    var response = GenericResponse.create()
        .withMessage("Created user: " + user.getUsername());
    return ResponseEntity.ok(response);
  }

  @GetMapping
  public ResponseEntity getUsers(@CurrentUser User loggedInUser, Pageable pageable) {
    var users = userService.getUsers(loggedInUser, pageable);
    return ResponseEntity.ok(users);
  }

  @ExceptionHandler({MethodArgumentNotValidException.class})
  @ResponseStatus(code = HttpStatus.BAD_REQUEST)
  public ApiError handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest req) {
    ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST.value(), "Validation error", req.getServletPath());

    BindingResult bindingResult = ex.getBindingResult();

    bindingResult.getFieldErrors().stream().forEach(fieldError -> {
      apiError.addError(fieldError.getField(), fieldError.getDefaultMessage());
    });

    return apiError;
  }
}
