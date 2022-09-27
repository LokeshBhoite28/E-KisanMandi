package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BidCropDTO;
import com.app.dto.BidsDTO;
import com.app.dto.FarmerCropDTO;
import com.app.dto.UserDTO;
import com.app.service.IBidsService;
import com.app.service.ISelectedBidsService;

@RestController
@RequestMapping("/api/crops")
@Validated
@CrossOrigin
public class BidController {
	@Autowired
	private IBidsService bidService;
	
	@Autowired
	private ISelectedBidsService selectedBidService;

	@GetMapping
	public ResponseEntity<?> showAllBids() {
		List<BidsDTO> list = bidService.getAllBidsDetails();
		if (list.isEmpty()) {
			return ResponseEntity.ok("No Bids yet...!!!");
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("/{cropId}/bid")
	public ResponseEntity<?> showAllBidFromCropid(@PathVariable Long cropId){
		List<BidsDTO> list = bidService.getAllBidsFromCropId(cropId);
		if (list.isEmpty()) {
			return ResponseEntity.ok(null);
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@PostMapping("/{userId}/{cropId}")
	public ResponseEntity<BidsDTO> AddBid(@PathVariable Long userId, @PathVariable Long cropId, @RequestBody BidsDTO bidDto) {
		return new ResponseEntity<>(bidService.saveBidDetails(bidDto, cropId, userId), HttpStatus.CREATED);
	}

	@GetMapping("/{bidId}/user")
	public UserDTO getUserByBidId(@PathVariable Long bidId) {
		return bidService.getBidder(bidId);
	}
	
	@DeleteMapping("/bid/{cropId}")
	public ResponseEntity<?> removeBidByCropId(@PathVariable Long cropId){
		return new ResponseEntity<>(bidService.deleteBidByCropId(cropId), HttpStatus.OK);
	}
	
	@GetMapping("bidder/{bidderId}/bid")
	public ResponseEntity<?> showAllBidFromBidId(@PathVariable Long bidderId) {
		List<BidCropDTO> list = bidService.getAllBidsFromBidderId(bidderId);
		if (list.isEmpty()) {
			return ResponseEntity.ok(null);
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@GetMapping("bid/{bidId}/crop")
	public FarmerCropDTO getCropByBidId(@PathVariable Long bidId) {
		return bidService.getCropByBidId(bidId);
	}
	
	
	@PostMapping("/{farmerId}/bid/{bidId}")
	public ResponseEntity<?> saveSelectedBidData(@PathVariable Long farmerId,@PathVariable Long bidId){
		String response = selectedBidService.saveSelectedBid(farmerId, bidId);
		if(response != null) {
			return ResponseEntity.ok(response);
		}
	return  ResponseEntity.ok(null);
	}
}
