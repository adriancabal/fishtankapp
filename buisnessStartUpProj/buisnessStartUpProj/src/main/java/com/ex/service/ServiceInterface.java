package com.ex.service;

import java.awt.Dimension;
import java.io.File;
import java.util.List;

import com.ex.domain.*;


public interface ServiceInterface {
	
	//category
	public Category categoryById(int id);
	
	//description
	public List<Description> descriptionsByProjectId(Integer id);
	public Description createDescription(Description description, String projectTitle);
	
	//image
	public List<String> imagesByProjectId(Integer id);
	public List<String> getImagesByProjectTitle(String projectTitle);
	public Dimension getScaledDimension(Dimension imgSize, Dimension boundary);
	public Image createImage(String imageKey, File imageFile, String projectTitle);
	
	//user
	public User authenticate(String username, String password);
	public User findUser(String username);
	public User updateUser(User user, String username);
	
	//project
	public Project createProject(Project project, String username, int id, int duration);
	public Project updateProject(Project project, String projectName);
	public List<Project> getAllProjectsOrderByGoalDesc();
	public List<Project> getAllProjectsOrderByCurrentAmountDesc();
	public List<Project> getAllProjectsOrderByRatioAsc();
	public List<Project> getAllProjectsOrderByRatingDesc();
	public List<Project> getAllProjectsOrderByStartDateDesc();
	public List<Project> getAllProjectsOrderByEndDateAsc();
	public List<Project> getAllProjectsByCategory(int id);
	public List<Project> getProjectsByUser(String username);
	
	//update
	public Update createUpdate(Update update, String projectTitle);
	public List<Update> getAllUpdatesByProjectOrderByDateDesc(String projectTitle);

	//review
	public List<Review> getReviewsByUsername(String username);
	public List<Review> getReviewsByProjectId(Integer id);
	public Review createReview(Review review, String username, int projectId);

	//investment
	public List<Investment> investmentsByUsername(String username);
	public List<Investment> investmentsByProjId(Integer id);
	public Investment createInvestment(Investment investment, String username, String projectTitle);

}
