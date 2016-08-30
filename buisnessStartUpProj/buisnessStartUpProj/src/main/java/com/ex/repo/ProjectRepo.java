package com.ex.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ex.domain.Category;
import com.ex.domain.Project;
import com.ex.domain.User;

public interface ProjectRepo extends JpaRepository<Project, Integer>{
	
	Project findById(Integer id);
	Project findByTitle(String title);
	List<Project> findAllByOrderByGoalDesc();
	List<Project> findAllByOrderByCurrentAmountDesc();
	List<Project> findAllByOrderByRatioDesc();
	List<Project> findAllByOrderByRatioAsc();
	List<Project> findAllByOrderByRatingDesc();
	List<Project> findAllByOrderByStartDateDesc();
	List<Project> findAllByOrderByEndDateAsc();
	List<Project> findByCategory(Category category);
	List<Project> findByUser(User user);
}
