package com.app.dto;

import javax.validation.constraints.NotBlank;

import com.app.entities.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BidsDTO extends BaseEntity {
	
	@NotBlank(message = "Bid amount must be supplied")
	private Double bidAmount;
	
}
