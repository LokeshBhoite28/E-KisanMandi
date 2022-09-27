package com.app.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AddressDTO;
import com.app.dto.PasswordDTO;
import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.service.IUserService;
import com.app.service.ImageHandlingService;

@RestController 
@RequestMapping("/api/user")
@Validated
@CrossOrigin
public class UsersController {
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private ImageHandlingService imageHandlingService;
	
	@GetMapping
	public ResponseEntity<?> listAllUsers(){
		 List<UserDTO> list = userService.getAllUserDetails();
		 if(list.isEmpty())
				return ResponseEntity.ok("Empty List...!!!!");
		 		//return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			return new ResponseEntity<>(list,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getUser(@PathVariable Long id) {
			return ResponseEntity.ok(userService.getUserDetails(id));	
	}
	
	@DeleteMapping("/{id}")
	public String deleteUser(@PathVariable Long id) {
		return userService.deleteUserDetails(id);
	}
	
	@PutMapping
	public UserDTO updateUser(@RequestBody @Valid UserDTO user) {
		return userService.updateUserDetails(user);
	}
	
	@PostMapping("/{id}/address")
	public ResponseEntity<AddressDTO> linkUserAddress(@PathVariable Long id,@RequestBody AddressDTO a) {
		return new ResponseEntity<>(userService.linkAddress(id, a),HttpStatus.CREATED);
		
	}
	
	@GetMapping("/{id}/address")
	public ResponseEntity<?> getUserAddress(@PathVariable Long id) {
			return ResponseEntity.ok(userService.getAddress(id));	
	}
	
	@PutMapping("/{id}/address")
	public ResponseEntity<AddressDTO> updateUserAddress(@PathVariable Long id,@RequestBody AddressDTO a) {
		return new ResponseEntity<>(userService.updateAddress(id, a),HttpStatus.CREATED);
		
	}
	
	
	@GetMapping("/role/{role}")
	public ResponseEntity<?> userListByRole(@PathVariable Role role){
		 List<UserDTO> list = userService.getUserByRole(role);
		 if(list.isEmpty())
				return ResponseEntity.ok("Empty List...!!!!");
			return new ResponseEntity<>(list,HttpStatus.OK);
	}
	
	@GetMapping("/crop/{cropId}/address")
	public ResponseEntity<?> getAddressByCropId(@PathVariable Long cropId){
		return ResponseEntity.ok(userService.getUserAddressByCropId(cropId));
	}
	
	@GetMapping("/username/{email}")
	public ResponseEntity<?> getUserByUserName(@PathVariable String email) {
			return ResponseEntity.ok(userService.getUserByEmail(email));	
	}
	
	// add a method to upload image on the server side folder
		@PostMapping("/{userId}/image")
		public ResponseEntity<?> uploadImage(@PathVariable Long userId, @RequestParam MultipartFile imageFile)
				throws IOException {
			System.out.println("in upload image " + userId);
			System.out.println("uploaded img file name " + imageFile.getOriginalFilename() + " content type "
					+ imageFile.getContentType() + " size " + imageFile.getSize());
			// invoke service layer method to save uploaded file in the server side folder
			// -- ImageHandlingService
			UserDTO userDTO = imageHandlingService.storeImage(userId, imageFile);
			return ResponseEntity.ok(userDTO);
		}

		// add request handling method to download the image for specific emp
		@GetMapping(value = "/{userId}/image", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
				MediaType.IMAGE_PNG_VALUE })
		public ResponseEntity<?> downloadImage(@PathVariable Long userId) throws IOException {
			System.out.println("in img download " + userId);
			//invoke service layer method , to get image data from the server side folder
			byte[] imageContents=imageHandlingService.restoreImage(userId);
			return ResponseEntity.ok(imageContents);
		}
		
		@PostMapping("/{userId}/password")
		public ResponseEntity<?> changeUserPassword(@PathVariable Long userId,@RequestBody @Valid PasswordDTO pass ){
			return ResponseEntity.ok(userService.changePassword(userId, pass.getNewPass()));
		}
}
