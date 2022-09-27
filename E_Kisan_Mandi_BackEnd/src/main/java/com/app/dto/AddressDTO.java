package com.app.dto;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import com.app.entities.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AddressDTO  extends BaseEntity{

	@NotBlank(message = "location must be supplied")
	private String location;
	
	@NotBlank(message = "tehsil must be supplied")
	private String tehsil;
	
	@NotBlank(message = "district must be supplied")
	private String district;
	
	@NotBlank(message = "state must be supplied")
	private String state;
	
	@NotBlank(message = "country must be supplied")
	private String country;
	
	@NotBlank(message = "Pin code name must be supplied")
	@Length(min = 0,max=6,message = "Invalid pin code")
	private String pinCode;
	
}
