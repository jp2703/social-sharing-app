package de.jeropeter.socialsharingappserver.configuration;

import java.io.File;
import java.util.concurrent.TimeUnit;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

  private final AppConfiguration appConfiguration;

  public WebConfiguration(AppConfiguration appConfiguration) {
    this.appConfiguration = appConfiguration;
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/images/**")
        .addResourceLocations(
            "file:" + "social-sharing-app-server/images/profile",
            "file:" + "social-sharing-app-server/images/posts"
        )
        .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
  }

  @Bean
  public CommandLineRunner createUploadFolder() {
    return args -> {
      createFolderIfNotExists(appConfiguration.getProfileImagesUploadPath());
      createFolderIfNotExists(appConfiguration.getPostsPath());
    };
  }

  private void createFolderIfNotExists(String folderPath) {
    File uploadFolder = new File(folderPath);
    boolean uploadFolderExists = uploadFolder.exists() && uploadFolder.isDirectory();
    if (!uploadFolderExists) {
      uploadFolder.mkdir();
    }
  }
}
