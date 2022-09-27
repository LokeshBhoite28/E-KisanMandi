package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.UserDTO;

public interface ImageHandlingService {

	UserDTO storeImage(Long userId, MultipartFile imageFile) throws IOException ;

	byte[] restoreImage(Long userId) throws IOException;

}
