package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.app.entities.AdharCard;
import com.app.entities.BaseEntity;
import com.app.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO extends BaseEntity {

	@NotBlank(message = "First name must be supplied")
	private String firstName;

	@NotBlank(message = "Last name must be supplied")
	private String lastName;

	@NotBlank(message = "Email must be supplied")
	@Length(min = 5, max = 20)
	@Email(message = "Invalid email format")
	private String email;

	@JsonProperty(access = Access.WRITE_ONLY) // for de-serialization only=>password won't be serialized to json
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})")
	private String password;

	@NotBlank(message = "Contact no must be supplied")
	@Length(min = 0, max = 10, message = "Invalid contact no")
	private String contactNo;

	@NotNull(message = "Role Must be Supplied")
	private Role role;
	
	@JsonProperty(access = Access.READ_ONLY) //for serialization only
	private String imagePath;

	@NotNull(message = "Adhar Card Details must be supplied")
	private AdharCard card;

}
