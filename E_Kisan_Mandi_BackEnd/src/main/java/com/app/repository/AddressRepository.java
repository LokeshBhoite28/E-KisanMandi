package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{

	List<Address> findByDistrict(String district);
}
