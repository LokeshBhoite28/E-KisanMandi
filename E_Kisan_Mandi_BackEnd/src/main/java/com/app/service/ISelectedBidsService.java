package com.app.service;

import java.util.List;

import com.app.dto.BidCropDTO;

public interface ISelectedBidsService {

	//Save selected bid
	String saveSelectedBid(Long farmerId,Long bidId);
	
	//selected bid from bidder Id
	List<BidCropDTO> getSelectedBidByBidderId(Long bidderId);
}
