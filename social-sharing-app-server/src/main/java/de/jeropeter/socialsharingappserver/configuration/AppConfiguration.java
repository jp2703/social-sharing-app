package de.jeropeter.socialsharingappserver.configuration;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class AppConfiguration {

  @Value("${social-sharing-app.images.profile.upload-path}")
  private String profileImagesUploadPath;

  @Value("${social-sharing-app.images.posts.upload-path}")
  private String postsPath;

}
