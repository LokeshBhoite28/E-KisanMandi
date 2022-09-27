package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.AddressDTO;
import com.app.dto.AuthRequestDTO;
import com.app.dto.UserDTO;
import com.app.entities.Address;
import com.app.entities.FarmerCrop;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.repository.AddressRepository;
import com.app.repository.BidsRepository;
import com.app.repository.FarmerCropRepository;
import com.app.repository.UserRepository;

@Service
@Transactional//tx mangement--->any time when there is dao layer method involment(CRUD)
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private AddressRepository addressRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private FarmerCropRepository farmerCropRepo;
	
	@Autowired
	private BidsRepository bidRepo;

	@Override
	public UserDTO saveUserDetails(UserDTO userDto) {
		User userEntity = mapper.map(userDto, User.class);//DTO ---> Entity
		userEntity.getRole();
		userEntity.setPassword(encoder.encode(userDto.getPassword()));
		
		User persistentUser = userRepo.save(userEntity);
	
		return mapper.map(persistentUser, UserDTO.class);
	}
	
	@Override
	public List<UserDTO> getAllUserDetails() {
		List<User> list = userRepo.findAll();
		List<UserDTO> userDtoList=new ArrayList<>();
		for(User u:list) {
			userDtoList.add(mapper.map(u, UserDTO.class));
		}
		return userDtoList;
	}

	@Override
	public UserDTO getUserDetails(Long userId) {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User id..!!!!!!" + userId));
		return mapper.map(user, UserDTO.class);
	}

	@Override
	public String deleteUserDetails(Long userId) {
		String mesg = "Deletion of User details failed.!!!!!!!!";
		
		if (userRepo.existsById(userId)) {
			bidRepo.deleteBidByBidderId(userId);
			addressRepo.deleteById(userId);
			userRepo.deleteById(userId);
			mesg = "User details deleted successfully , for user id : " + userId;
		}
		return mesg;
	}

	@Override
	public UserDTO updateUserDetails(UserDTO updatedUser) {
		
		User PrevUser = userRepo.getById(updatedUser.getId());
		updatedUser.setPassword(PrevUser.getPassword());
		
		User user = mapper.map(updatedUser, User.class);
		
		return mapper.map(userRepo.save(user), UserDTO.class);
	}

	
	@Override
	public AddressDTO linkAddress(Long userId, AddressDTO a) {
		Address address = mapper.map(a, Address.class);
		User user = userRepo.getById(userId);
				//.orElseThrow(() -> new ResourceNotFoundException("Invalid User id..!!!!!!" + userId));
		address.setUser(user);
		return mapper.map(addressRepo.save(address), AddressDTO.class);
	}

	@Override
	public AddressDTO getAddress(Long id) {
		Address a = addressRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User id..!!!!"+id));
		return mapper.map(a, AddressDTO.class);
	}

	@Override
	public AddressDTO updateAddress(Long userId, AddressDTO updatedAddress) {
		Address adr = mapper.map(updatedAddress, Address.class);
		User user = userRepo.getById(userId);
				//.orElseThrow(() -> new ResourceNotFoundException("Invalid User id..!!!!!!" + userId));
		adr.setUser(user);
		return mapper.map(addressRepo.save(adr), AddressDTO.class);
	}

	@Override
	public UserDTO AuthenticateUser(AuthRequestDTO user) {
		User authUser = mapper.map(user, User.class);
		User authenticateduser = userRepo.authenticateUserDetails(authUser.getEmail(), authUser.getPassword());
		return mapper.map(authenticateduser, UserDTO.class);
	}

	@Override
	public List<UserDTO> getUserByRole(Role role) {
		List<User> list = userRepo.findByRole(role);
		List<UserDTO> dtoList = new ArrayList<>();
		for(User u:list) {
			dtoList.add(mapper.map(u, UserDTO.class));
		}
		return dtoList;
	}

	@Override
	public AddressDTO getUserAddressByCropId(Long cId) {
		FarmerCrop crop = farmerCropRepo.getById(cId);
		Long fId = crop.getUser().getId();
		return mapper.map(addressRepo.getById(fId), AddressDTO.class);
	}

	@Override
	public UserDTO getUserByEmail(String email) {
		return mapper.map(userRepo.findByEmail(email), UserDTO.class);
	}

	@Override
	public String changePassword(Long id, String newPass) {
		User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("invalid user id..!!!"));
		if(user != null) {
			user.setPassword(encoder.encode(newPass));
			return "password changed..!!!";
		}
		return "Error while changing password..!!!";
	}
	
	
}
