package de.jeropeter.socialsharingappserver.service;

import de.jeropeter.socialsharingappserver.api.request.dto.user.CreateUserDto;
import de.jeropeter.socialsharingappserver.api.response.dto.GetUserDto;
import de.jeropeter.socialsharingappserver.data.model.User;
import de.jeropeter.socialsharingappserver.data.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository,
      PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User saveUser(CreateUserDto userDto) {
    var user = createUserFromCreateUserDto(userDto);
    var savedUser = userRepository.save(user);
    return savedUser;
  }

  public User createUserFromCreateUserDto(CreateUserDto userDto) {
    User user = new User();
    user.setUsername(userDto.getUsername());
    user.setDisplayName(userDto.getDisplayName());
    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    return user;
  }

  private GetUserDto createGetUserDto(User user) {
    return new GetUserDto()
        .withUsername(user.getUsername())
        .withDisplayName(user.getDisplayName())
        .withImage(user.getImage());
  }

  public Page<GetUserDto> getUsers(User loggedInUser, Pageable pageable) {
    Page<User> users;
    if (loggedInUser != null) {
      users = userRepository.findByUsernameNot(loggedInUser.getUsername(), pageable);
    } else {
      users = userRepository.findAll(pageable);
    }
    var userDtos = users.map(user -> createGetUserDto(user));
    return userDtos;
  }
}
