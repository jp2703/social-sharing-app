package de.jeropeter.socialsharingappserver.service;

import de.jeropeter.socialsharingappserver.api.request.dto.user.CreateUserDto;
import de.jeropeter.socialsharingappserver.data.model.User;
import de.jeropeter.socialsharingappserver.data.repository.UserRepository;
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

  public User saveUser(CreateUserDto userDto){
    var user = createUserFromCreateUserDto(userDto);
    var savedUser = userRepository.save(user);
    return savedUser;
  }

  public User createUserFromCreateUserDto(CreateUserDto userDto){
    User user = new User();
    user.setUsername(userDto.getUsername());
    user.setDisplayName(userDto.getDisplayName());
    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    return user;
  }
}
