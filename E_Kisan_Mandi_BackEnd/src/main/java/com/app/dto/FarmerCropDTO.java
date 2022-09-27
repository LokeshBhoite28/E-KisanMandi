package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import com.app.entities.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FarmerCropDTO extends BaseEntity {

	@NotBlank(message = "Crop name must be supplied")
	private String cropName;
	
	@NotBlank(message = "Species must be supplied")
	private String species;

	@NotBlank(message = "Grade must be supplied")
	private String grade;
	
	@NotNull
	@Past(message = "sowing date must be in the past")
	private LocalDate sowingDate;
	
	@NotNull
	private LocalDate harvestDate;
	
	@NotNull
	@NotNull(message = "Quantity must be supplied")
	private Double quantity;
	
	private String photos;
	
	@NotNull
	@NotNull(message = "Least price must be supplied")
	private Double leastPrice;
	
	@NotNull(message = "Status Details must be supplied")
	private boolean status;

	
}
