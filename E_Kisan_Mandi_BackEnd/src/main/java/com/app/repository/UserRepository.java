package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Role;
import com.app.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	@Query("select u from User u where u.email=?1 and u.password=?2")
	User authenticateUserDetails(String email,String password);
	

	Optional<User> findByEmail(String email);
	
	List<User> findByRole(Role role);

}
