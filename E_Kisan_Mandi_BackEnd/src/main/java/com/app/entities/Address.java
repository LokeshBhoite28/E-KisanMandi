package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "adr_tbl")
@Setter
@NoArgsConstructor
public class Address extends BaseEntity {
	
	@Column(length = 30)
	private String location;
	@Column(length = 30)
	private String tehsil;
	@Column(length = 30)
	private String district;
	@Column(length = 30)
	private String state;
	@Column(length = 30)
	private String country;
	@Column(length = 30)
	private String pinCode;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id",nullable = false) //nullable is optional but recommended to use in onetoOne uni-directional case
	@MapsId 
	private User user;

	public Address(String location,String tehsil, String district, String state, String country,String pinCode) {
		super();
		this.location =location;
		this.tehsil = tehsil;
		this.district = district;
		this.state = state;
		this.country = country;
		this.pinCode = pinCode;
	
	}
	
	@Override
	public String toString() {
		return "Address [location=" + location + ", tehsil=" + tehsil + ", district=" + district + ", state=" + state
				+ ", country=" + country + ", pinCode=" + pinCode + "]";
	}

	
	public String getTehsil() {
		return tehsil;
	}

	public String getDistrict() {
		return district;
	}

	public String getState() {
		return state;
	}

	public String getCountry() {
		return country;
	}

	public String getLocation() {
		return location;
	}

	public String getPinCode() {
		return pinCode;
	}
	
}
