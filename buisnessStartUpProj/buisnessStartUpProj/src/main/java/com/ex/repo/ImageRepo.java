package com.ex.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ex.domain.Image;
import com.ex.domain.Project;

public interface ImageRepo extends  JpaRepository<Image, Integer>{
	List<Image> findByProjectOrderByOrderAsc(Project project);
	List<Image> findByProjectOrderByOrderDesc(Project project);
}
