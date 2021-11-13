package de.jeropeter.socialsharingappserver.api.dto;

import lombok.Data;

@Data
public class CreateUserDto {
  private String username;

  private String displayName;

  private String password;
}
