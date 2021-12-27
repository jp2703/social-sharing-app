package de.jeropeter.socialsharingappserver.api.request.dto.user;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateUserDto {

  @NotNull(message = "Display name required")
  @Size(min = 4, max = 255, message = "Display name must be between 4 and 255 characters long")
  private String displayName;
}
