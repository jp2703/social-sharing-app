package de.jeropeter.socialsharingappserver.service;

import de.jeropeter.socialsharingappserver.api.dto.CreateUserDto;
import de.jeropeter.socialsharingappserver.data.model.User;
import de.jeropeter.socialsharingappserver.data.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
    this.passwordEncoder = new BCryptPasswordEncoder();
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
