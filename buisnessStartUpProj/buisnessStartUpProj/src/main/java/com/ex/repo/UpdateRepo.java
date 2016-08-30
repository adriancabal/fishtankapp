package com.ex.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ex.domain.Project;
import com.ex.domain.Update;

public interface UpdateRepo extends JpaRepository<Update, Integer>{
	List<Update> findAllByProjectOrderByDateDesc(Project project);
}
