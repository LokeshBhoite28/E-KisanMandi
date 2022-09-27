package com.app.service;

import java.util.List;

import com.app.dto.FarmerCropDTO;
import com.app.dto.UserDTO;

public interface IFarmerCropService {

	//save new crop details
	FarmerCropDTO saveCropDetails(Long fId, FarmerCropDTO crop);
	
	//get all Crops for trader
	List<FarmerCropDTO> getAllCropsDetails();
	
	//get all Crops of specific farmer
	List<FarmerCropDTO> getAllCropsDetailsOfSpecificFarmer(Long fId);
	
	//get crop details by specified id
	FarmerCropDTO getCropDetails(Long cropId);
	
	//delete crop details
	String deleteCropDetails(Long cropId);
	
	//update crop details
	FarmerCropDTO updateCropDetails(Long fId, FarmerCropDTO updatedCrop);
	
	//get crop from name
	List<FarmerCropDTO> getAllCropsByName(String name);
	
	//get farmer from crop id
	UserDTO getFarmerByCropId(Long cropId);
	
	List<FarmerCropDTO> getCropsByDistrict(String district);
	
}
