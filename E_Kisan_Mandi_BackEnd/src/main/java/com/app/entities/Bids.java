package com.app.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "bid")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Bids extends BaseEntity {

	@Column(name= "bid_amount")
	private Double bidAmount;
	
	public Bids(Double bidAmount) {
		super();
		this.bidAmount = bidAmount;
	}
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "crop_id")
	private FarmerCrop crop;
	
//	@ManyToMany
//	@JoinTable(name = "bid_user",
//	joinColumns = @JoinColumn(name="bid_id"),inverseJoinColumns = @JoinColumn(name="user_id"))
//	private Set<User> bidders=new HashSet<>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "bidder_id")
	private User Bidder;
	
}
