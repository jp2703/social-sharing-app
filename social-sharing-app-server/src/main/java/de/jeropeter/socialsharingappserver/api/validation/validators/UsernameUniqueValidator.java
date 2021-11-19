package de.jeropeter.socialsharingappserver.api.validation.validators;

import de.jeropeter.socialsharingappserver.api.validation.annotations.UsernameUnique;
import de.jeropeter.socialsharingappserver.data.model.User;
import de.jeropeter.socialsharingappserver.data.repository.UserRepository;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

@Component
public class UsernameUniqueValidator implements ConstraintValidator<UsernameUnique, String> {

  private final UserRepository userRepository;

  public UsernameUniqueValidator(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
    User user = userRepository.findByUsername(username);
    if (user == null) {
      return true;
    } else {
      return false;
    }
  }
}
