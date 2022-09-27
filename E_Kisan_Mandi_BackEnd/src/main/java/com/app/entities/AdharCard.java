package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Embeddable//MANDATORY, To tell hibernate that following class does not have separate identity,BUT will be embedded in owning entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdharCard {
	
	@Column(length = 20,unique = true,name = "card_no")
	private String cardNo;
	@Column(length = 20)
	private String location;
}
