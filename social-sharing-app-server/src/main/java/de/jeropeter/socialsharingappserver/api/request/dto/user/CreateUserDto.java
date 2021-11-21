package de.jeropeter.socialsharingappserver.api.request.dto.user;

import de.jeropeter.socialsharingappserver.api.validation.annotations.UsernameUnique;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateUserDto {

  @NotNull(message = "Username required")
  @UsernameUnique(message = "User already exists")
  @Size(min = 4, max = 255, message = "Username must be between 4 and 255 characters long")
  private String username;

  @NotNull(message = "Display name required")
  @Size(min = 4, max = 255, message = "Display name must be between 4 and 255 characters long")
  private String displayName;

  @NotNull(message = "Password required")
  @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters long")
  private String password;
}
