package com.ex.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ex.domain.Investment;
import com.ex.domain.Project;
import com.ex.domain.User;

public interface InvestmentRepo extends JpaRepository<Investment, Integer> {
	List<Investment> findByUserOrderByDateDesc(User user);
	List<Investment> findByProjectOrderByDateDesc(Project project);
}
