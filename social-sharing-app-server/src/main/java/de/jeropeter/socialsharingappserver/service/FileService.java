package de.jeropeter.socialsharingappserver.service;

import de.jeropeter.socialsharingappserver.configuration.AppConfiguration;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.UUID;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class FileService {

  private final AppConfiguration appConfiguration;

  public FileService(AppConfiguration appConfiguration) {
    this.appConfiguration = appConfiguration;
  }

  public String saveProfileImage(String base64Image) throws IOException {
    String partSeparator = ",";
    String imageName = UUID.randomUUID().toString().replaceAll("-", "");
    byte[] decodedBytes = Base64.getDecoder().decode(base64Image.split(partSeparator)[1]);
    File target = new File(appConfiguration.getProfileImagesUploadPath() + File.separator + imageName);
    FileUtils.writeByteArrayToFile(target, decodedBytes);
    return imageName;
  }
}
