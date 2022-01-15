package de.jeropeter.socialsharingappserver.service;

import de.jeropeter.socialsharingappserver.api.error.exception.NotFoundException;
import de.jeropeter.socialsharingappserver.api.request.dto.user.CreateUserDto;
import de.jeropeter.socialsharingappserver.api.request.dto.user.UpdateUserDto;
import de.jeropeter.socialsharingappserver.api.response.dto.GetUserDto;
import de.jeropeter.socialsharingappserver.data.model.User;
import de.jeropeter.socialsharingappserver.data.repository.UserRepository;
import java.io.IOException;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final FileService fileService;

  public UserService(UserRepository userRepository,
      PasswordEncoder passwordEncoder, FileService fileService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.fileService = fileService;
  }

  public User saveUser(CreateUserDto userDto) {
    var user = createUserFromCreateUserDto(userDto);
    var savedUser = userRepository.save(user);
    return savedUser;
  }

  public User updateUser(UpdateUserDto userUpdateDto, long id) {
    var user = userRepository.getById(id);
    user.setDisplayName(userUpdateDto.getDisplayName());
    if (userUpdateDto.getImage() != null) {
      String savedImageName = null;
      try {
        savedImageName = fileService.saveProfileImage(userUpdateDto.getImage());
        user.setImage(savedImageName);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    return userRepository.save(user);
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
        .withImage(user.getImage())
        .withId(user.getId());
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

  public GetUserDto getUser(String username) {
    var user = userRepository.findByUsername(username);
    if (user == null) {
      throw new NotFoundException("User with name " + username + " not found");
    }
    return createGetUserDto(user);
  }
}
