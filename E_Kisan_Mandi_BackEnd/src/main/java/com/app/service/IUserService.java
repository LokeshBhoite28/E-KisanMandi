package com.app.service;

import java.util.List;

import com.app.dto.AddressDTO;
import com.app.dto.AuthRequestDTO;
import com.app.dto.UserDTO;
import com.app.entities.Role;

public interface IUserService {
	
		//save new user details
		UserDTO saveUserDetails(UserDTO user);
		
		//get all users
		List<UserDTO> getAllUserDetails();
		
		//get user details by specified id
		UserDTO getUserDetails(Long userId);
		
		//delete user details
		String deleteUserDetails(Long userId);
		
		//update user details
		UserDTO updateUserDetails(UserDTO updatedUser);

		//Link Address to user
		AddressDTO linkAddress(Long userId,AddressDTO a);
		
		//get Address of user
		AddressDTO getAddress(Long id);
		
		//update address
		AddressDTO updateAddress(Long userId, AddressDTO updatedAddress);
		
		//get user from user name and password
		UserDTO AuthenticateUser(AuthRequestDTO user);
		
		//user list by role
		List<UserDTO> getUserByRole(Role role);
		
		//get user address by crop id
		AddressDTO getUserAddressByCropId(Long cId);
		
		//get user details by email
		UserDTO getUserByEmail(String email);
		
		//change password
		String changePassword(Long id,String newPass);
}
