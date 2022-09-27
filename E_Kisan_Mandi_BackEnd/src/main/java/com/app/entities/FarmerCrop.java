package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "crops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FarmerCrop extends BaseEntity {

	@Column(length = 30,name = "crop_name")
	private String cropName;
	@Column(length = 30)
	private String species;
	@Column(length = 30)
	private String grade;
	@Column(name = "sowing_date")
	private LocalDate sowingDate;//"YYYY-MM-DD"
	@Column(name = "harvest_date")
	private LocalDate harvestDate;
	private Double quantity;
	private String photos;
	@Column(name = "least_price")
	private Double leastPrice;
	private boolean status;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "f_id")
	private User user;

}
