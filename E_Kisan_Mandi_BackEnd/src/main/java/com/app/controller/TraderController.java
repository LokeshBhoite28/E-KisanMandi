package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BidCropDTO;
import com.app.dto.FarmerCropDTO;
import com.app.dto.UserDTO;
import com.app.service.IFarmerCropService;
import com.app.service.ISelectedBidsService;

@RestController
@RequestMapping("/api/trader")
@Validated
@CrossOrigin
public class TraderController {
	
	@Autowired
	private IFarmerCropService cropService;
	
	@Autowired
	private ISelectedBidsService selectedBidService;

	// get all crops by crop name
		@GetMapping("/crops/{cName}/list")
		public ResponseEntity<?> getAllCropsByCropName(@PathVariable String cName) {
			List<FarmerCropDTO> list = cropService.getAllCropsByName(cName);
			if (list.isEmpty()) {
				return ResponseEntity.ok(null);
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		}
		
		//get farmer from crop id
		@GetMapping("/crops/{cropId}/user")
		public UserDTO getFarmerFromCropId(@PathVariable Long cropId) {
			return cropService.getFarmerByCropId(cropId);
		}
		
		// get all crops listed (for trader)
		@GetMapping("/crops")
		public ResponseEntity<?> getAllCrops() {
			List<FarmerCropDTO> list = cropService.getAllCropsDetails();
			if (list.isEmpty()) {
				return ResponseEntity.ok("Empty List....!!!!!");
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		}
		
		@GetMapping("/crops/address/{district}")
		public ResponseEntity<?> getCropsFromDistrictName(@PathVariable String district){
			List<FarmerCropDTO> list = cropService.getCropsByDistrict(district);
			if (list.isEmpty()) {
				return ResponseEntity.ok("No crops Found..!!");
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		}
		
		@GetMapping("/{traderId}/selectedBids")
		public ResponseEntity<?> getSelectedBidsOfTrader(@PathVariable Long traderId){
			List<BidCropDTO> list=selectedBidService.getSelectedBidByBidderId(traderId);
			if (list.isEmpty()) {
				return ResponseEntity.ok("No Bids Selected yet..!!");
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
			
		}
		

}
