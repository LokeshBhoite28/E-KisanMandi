package com.app.service;

import java.util.ArrayList;
import java.util.List;



import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.BidCropDTO;
import com.app.dto.BidsDTO;
import com.app.dto.FarmerCropDTO;
import com.app.dto.UserDTO;
import com.app.entities.Bids;
import com.app.entities.FarmerCrop;
import com.app.entities.User;
import com.app.repository.BidsRepository;
import com.app.repository.FarmerCropRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class BidsServiceImpl implements IBidsService {

	@Autowired
	private BidsRepository bidRepo;
	
	@Autowired
	private FarmerCropRepository cropRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public BidsDTO saveBidDetails(BidsDTO bidDto ,Long cropId, Long userId) {
		Bids bid = mapper.map(bidDto, Bids.class);
		User trader = userRepo.getById(userId);
		FarmerCrop crop = cropRepo.getById(cropId);
		bid.setBidder(trader);
		bid.setCrop(crop);
		return mapper.map(bidRepo.save(bid), BidsDTO.class);
	}

	@Override
	public List<BidsDTO> getAllBidsDetails() {
		List<Bids> list = bidRepo.findAll();
		List<BidsDTO> BidsDtoList=new ArrayList<>();
		for(Bids b:list) {
			BidsDtoList.add(mapper.map(b, BidsDTO.class));
		}
		return BidsDtoList;
	}

	@Override
	public Bids getBidDetails(Long bidId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deleteBidDetails(Long bidId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Bids updateBidDetails(Bids updatedBid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<BidsDTO> getAllBidsFromCropId(Long cropId) {
		List<Bids> list = bidRepo.BidsFromCropId(cropId);
		List<BidsDTO> bidsDtoList=new ArrayList<>();
		for(Bids b:list) {
			bidsDtoList.add(mapper.map(b, BidsDTO.class));
		}
		return bidsDtoList;
	}

	@Override
	public UserDTO getBidder(Long bidId) {
		Bids bid = bidRepo.getById(bidId);
		User bidder = bid.getBidder();
		return mapper.map(bidder, UserDTO.class);
	}

	@Override
	public String deleteBidByCropId(Long cropId) {
		if(bidRepo.deleteBidByCropId(cropId) == 0) {
			return "deletion failed" ;
		}
		
		return  "deleted succedfully";
	}

	@Override
	@Transactional(readOnly = true)
	public List<BidCropDTO> getAllBidsFromBidderId(Long bidderId) {
		List<Bids> bids = bidRepo.BidsFromBidderId(bidderId);
		List<BidCropDTO> bidDtoList=new ArrayList<>();
		for(Bids b:bids) {
			bidDtoList.add(mapper.map(b, BidCropDTO.class));
		}
		return bidDtoList;
	}

	@Override
	public FarmerCropDTO getCropByBidId(Long bidId) {
		Bids bid = bidRepo.getById(bidId);
		return mapper.map(bid.getCrop(), FarmerCropDTO.class);
	}

}
