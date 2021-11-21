package de.jeropeter.socialsharingappserver.api.response.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(value = Include.NON_NULL)
public class UserLoginResponseDto {
  private String username;

  private String displayName;

  private String image;

  public UserLoginResponseDto withUsername(String username){
    setUsername(username);
    return this;
  }

  public UserLoginResponseDto withDisplayName(String displayName){
    setDisplayName(displayName);
    return this;
  }

  public UserLoginResponseDto withImage(String image){
    setImage(image);
    return this;
  }
}
