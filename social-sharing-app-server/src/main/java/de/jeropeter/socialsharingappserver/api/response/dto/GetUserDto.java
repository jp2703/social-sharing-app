package de.jeropeter.socialsharingappserver.api.response.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetUserDto {
  private String username;

  private String displayName;

  private String image;

  public GetUserDto withUsername(String username){
    setUsername(username);
    return this;
  }

  public GetUserDto withDisplayName(String displayName){
    setDisplayName(displayName);
    return this;
  }

  public GetUserDto withImage(String image){
    setImage(image);
    return this;
  }
}
