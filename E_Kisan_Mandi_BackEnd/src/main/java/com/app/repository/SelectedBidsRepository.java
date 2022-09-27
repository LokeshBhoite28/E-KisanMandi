package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.SelectedBids;

public interface SelectedBidsRepository extends JpaRepository<SelectedBids, Long> {

}
