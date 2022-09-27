package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="selected_bids")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SelectedBids extends BaseEntity {
	
	@ManyToOne
	@JoinColumn(name = "farmer_id")
	private User farmer;
	
	@OneToOne
	@MapsId
	@JoinColumn(name = "bid_id")
	private Bids selectedBid;

}
