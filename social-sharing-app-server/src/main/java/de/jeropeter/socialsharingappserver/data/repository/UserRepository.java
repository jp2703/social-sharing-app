package de.jeropeter.socialsharingappserver.data.repository;

import de.jeropeter.socialsharingappserver.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}