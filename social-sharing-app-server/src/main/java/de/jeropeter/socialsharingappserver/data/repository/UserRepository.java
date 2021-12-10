package de.jeropeter.socialsharingappserver.data.repository;

import de.jeropeter.socialsharingappserver.data.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByUsername(String username);

  Page<User> findByUsernameNot(String username, Pageable pageable);
}
