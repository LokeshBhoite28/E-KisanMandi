package com.app.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthRequestDTO {
	
	@NotBlank(message = "Email must be supplied")
	private String email;
	
	@NotBlank(message = "Password must be supplied")
	private String password;

}
