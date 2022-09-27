package com.app.dto;

import javax.validation.constraints.NotBlank;

import com.app.entities.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BidCropDTO extends BaseEntity{

	@NotBlank(message = "Bid amount must be supplied")
	private Double bidAmount;
	private String cropName;
}
