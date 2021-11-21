package de.jeropeter.socialsharingappserver.configuration.security;

import de.jeropeter.socialsharingappserver.data.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthUserService implements UserDetailsService {

  private final UserRepository userRepository;

  public AuthUserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    var user = userRepository.findByUsername(username);
    if(user == null){
      throw new UsernameNotFoundException("User not found");
    }
    return user;
  }
}
