package de.jeropeter.socialsharingappserver.api.response;

import lombok.Data;

@Data
public class GenericResponse {
  private String message;

  public static GenericResponse create(){
    return new GenericResponse();
  }

  public GenericResponse withMessage(String message){
    this.message = message;
    return this;
  }
}
