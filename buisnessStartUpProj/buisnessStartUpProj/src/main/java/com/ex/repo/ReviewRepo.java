package com.ex.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ex.domain.Project;
import com.ex.domain.Review;
import com.ex.domain.User;

public interface ReviewRepo  extends  JpaRepository<Review, Integer>{
	List<Review> findByUserOrderByDateDesc(User user);
	List<Review> findByProjectOrderByDateDesc(Project project);
}
