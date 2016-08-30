package com.ex.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ex.domain.Description;
import com.ex.domain.Project;

public interface DescriptionRepo extends JpaRepository<Description, Integer>{
	
	List<Description> findByProjectOrderByOrderAsc(Project project);

}
