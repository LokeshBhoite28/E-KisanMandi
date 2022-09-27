package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Bids;

@Repository
public interface BidsRepository extends JpaRepository<Bids, Long> {
	
	@Query("select b from Bids b where b.crop.id=?1")
	List<Bids> BidsFromCropId(Long cropId);
	
	@Modifying
	@Query("delete from Bids b where b.crop.id=?1")
	int deleteBidByCropId(Long cropId);
	
	@Modifying
	@Query("delete from Bids b where b.Bidder.id=?1")
	int deleteBidByBidderId(Long bidderId);
	
	@Query("select b from Bids b join fetch b.crop where b.Bidder.id=?1")
	List<Bids> BidsFromBidderId(Long bidderId);

}
