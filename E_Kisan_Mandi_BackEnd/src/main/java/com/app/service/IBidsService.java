package com.app.service;

import java.util.List;

import com.app.dto.BidCropDTO;
import com.app.dto.BidsDTO;
import com.app.dto.FarmerCropDTO;
import com.app.dto.UserDTO;
import com.app.entities.Bids;

public interface IBidsService {
	
		//save new Bid details
		BidsDTO saveBidDetails(BidsDTO bidDto,Long cropId, Long userId);
		
		//get all Bids
		List<BidsDTO> getAllBidsDetails();
		
		//get bids from crop id
		List<BidsDTO> getAllBidsFromCropId(Long cropId);
		
		//get bids from bidder id
		List<BidCropDTO> getAllBidsFromBidderId(Long bidderId);
		
		//get bid details by specified id
		Bids getBidDetails(Long bidId);
		
		//delete bid details
		String deleteBidDetails(Long bidId);
		
		//update bid details
		Bids updateBidDetails(Bids updatedBid);
		
		//to get bidder from bid id
		UserDTO getBidder(Long bidId);
		
		//delete bid by crop id
		String deleteBidByCropId(Long cropId);
		
		//to get crop from bid id
		FarmerCropDTO getCropByBidId(Long bidId);

}
