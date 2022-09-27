package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.UserDTO;
import com.app.entities.User;
import com.app.repository.UserRepository;

@Service
@Transactional // add whenever we want connection with dao/repository layer
public class ImageHandlingServiceImpl implements ImageHandlingService {
	@Value("${file.upload.location1}")//used to provide default values
	private String baseFolder;
	
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public UserDTO storeImage(Long userId, MultipartFile imageFile) throws IOException {
		
		User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid Id"));
		// user=> persistent
		// get the complete path
		String completePath = baseFolder + File.separator + imageFile.getOriginalFilename();
		System.out.println("complete path " + completePath);
		System.out.println("Copied no of bytes "
				+ Files.copy(imageFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING));
		// save complete path to the image in db

		// In case of saving file db directly : Simply call : imageFile.getBytes() --->
		// bytes[] -- call setter on user!

		user.setImagePath(completePath);
		return mapper.map(user, UserDTO.class);
	}

	@Override
	public byte[] restoreImage(Long userId) throws IOException {
		
		User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid Id"));
		// user=> persistent
		// get the complete image path from db --> extract image contents n send it to
		// the caller
		String path = user.getImagePath();
		System.out.println("img path " + path);
		// API of java.nio.file class : public byte[] readAllBytes(Path paths)
		return Files.readAllBytes(Paths.get(path));
	}

}
