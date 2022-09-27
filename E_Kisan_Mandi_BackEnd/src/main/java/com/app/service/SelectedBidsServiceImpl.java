package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.BidCropDTO;
import com.app.entities.Bids;
import com.app.entities.FarmerCrop;
import com.app.entities.SelectedBids;
import com.app.entities.User;
import com.app.repository.BidsRepository;
import com.app.repository.SelectedBidsRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class SelectedBidsServiceImpl implements ISelectedBidsService {

	@Autowired
	private SelectedBidsRepository selectedBidsRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private BidsRepository bidRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public String saveSelectedBid(Long farmerId, Long bidId) {
		
		User farmer = userRepo.getById(farmerId);
		Bids bid = bidRepo.getById(bidId);
		FarmerCrop soldCrop = bid.getCrop();
		soldCrop.setStatus(true);
		SelectedBids sBid=new SelectedBids();
		sBid.setFarmer(farmer);
		sBid.setSelectedBid(bid);
		if(selectedBidsRepo.save(sBid) != null) {
			return "selection saved";
		}
		return "selection of bid failed";
	}

	@Override
	public List<BidCropDTO> getSelectedBidByBidderId(Long bidderId) {
		List<Bids> bids = bidRepo.BidsFromBidderId(bidderId);
		List<Bids> selected =new ArrayList<>();
		for(Bids b:bids) {
			if(selectedBidsRepo.existsById(b.getId())) {
				selected.add(bidRepo.findById(b.getId()).orElseThrow(()->new ResourceNotFoundException("No selected Bids..!!!!!")));
			}
		}
		
		List<BidCropDTO> selectedDto=new ArrayList<>();
		for(Bids s:selected) {
			selectedDto.add(mapper.map(s, BidCropDTO.class));
		}
		return  selectedDto;
	}
	
	

}
