package com.ex.service;

import java.awt.Dimension;
import java.io.File;
import java.net.URL;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ex.domain.Category;
import com.ex.domain.Description;
import com.ex.domain.Image;
import com.ex.domain.Investment;
import com.ex.domain.Project;
import com.ex.domain.Review;
import com.ex.domain.Update;
import com.ex.domain.User;
import com.ex.repo.CategoryRepo;
import com.ex.repo.DescriptionRepo;
import com.ex.repo.ImageRepo;
import com.ex.repo.InvestmentRepo;
import com.ex.repo.ProjectRepo;
import com.ex.repo.ReviewRepo;
import com.ex.repo.UpdateRepo;
import com.ex.repo.UserRepo;

@Service
@Transactional
public class ServiceImpl implements ServiceInterface {
	
	//Repos autowired
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ProjectRepo projectRepo;
	
	@Autowired
	private CategoryRepo categoryRepo;
	
	@Autowired
	private UpdateRepo updateRepo;
	
	@Autowired
	private DescriptionRepo descriptionRepo;
	
	@Autowired
	private ImageRepo imageRepo;
	
	@Autowired
	private InvestmentRepo investmentRepo;
	
	@Autowired
	private ReviewRepo reviewRepo;
	
	
	//User Services
	public User authenticate(String username, String password){
		return userRepo.findByUsernameAndPassword(username, password);
	}
	
	public User findUser(String username){
		return userRepo.findByUsername(username);
	}
	
	public User updateUser(User user, String username){
		User oldUser = userRepo.findByUsername(username);
		
		if(user.getFirstname()!=null){
			oldUser.setFirstname(user.getFirstname());;
		}
		if(user.getEmail() !=null){
			oldUser.setEmail(user.getEmail());
		}
		if(user.getLastname() !=null){
			oldUser.setLastname(user.getLastname());
		}
		if(user.getUsername() !=null){
			oldUser.setUsername(user.getUsername());
		}
		if(user.getPassword() !=null){
			oldUser.setPassword(user.getPassword());
		}
		return oldUser;
	}
	
	
	//Project Services
	public Project createProject(Project project, String username, int id, int duration){
		
		project.setUser(userRepo.findByUsername(username));
		project.setCategory(categoryRepo.findById(id));
		Timestamp ts = new Timestamp(new Date().getTime());
		project.setStartDate(ts);
		Calendar cal = Calendar.getInstance();
		cal.setTime(ts);
		cal.add(Calendar.DAY_OF_WEEK, duration);
		ts = new Timestamp(cal.getTime().getTime());
		//ts.setTime(cal.getTime().getTime());
		project.setEndDate(ts);
		return projectRepo.save(project);
	}
	
	public Project updateProject(Project project, String projectTitle){
		Project updatedProject = projectRepo.findByTitle(projectTitle);
		
		if(project.getTitle()!=null){
			updatedProject.setTitle(project.getTitle());
		}if(project.getLocation()!=null){
			updatedProject.setLocation(project.getLocation());
		}if(project.getLink()!=null){
			updatedProject.setLink(project.getLink());
		}if(project.getRatio()!=0){
			updatedProject.setRatio(project.getRatio());
		}if(project.getCurrentAmount()!=0){
			updatedProject.setCurrentAmount(project.getCurrentAmount());
		}if(project.getRating()!=0){
			updatedProject.setRating(project.getRating());
		}
		
		return projectRepo.save(updatedProject);
	}
	
	public List<Project> getAllProjectsOrderByGoalDesc(){
		return projectRepo.findAllByOrderByGoalDesc();
	}
	public List<Project> getAllProjectsOrderByCurrentAmountDesc(){
		return projectRepo.findAllByOrderByCurrentAmountDesc();
	}
	public List<Project> getAllProjectsOrderByRatioAsc(){
		return projectRepo.findAllByOrderByRatioAsc();
	}
	public List<Project> getAllProjectsOrderByRatingDesc(){
		return projectRepo.findAllByOrderByRatingDesc();
	}
	public List<Project> getAllProjectsOrderByStartDateDesc(){
		return projectRepo.findAllByOrderByStartDateDesc();
	}
	public List<Project> getAllProjectsOrderByEndDateAsc(){
		return projectRepo.findAllByOrderByEndDateAsc();
	}
	public List<Project> getAllProjectsByCategory(int id){
		Category category = categoryRepo.findById(id);
		return projectRepo.findByCategory(category);
	}
	public List<Project> getProjectsByUser(String username){
		User user = userRepo.findByUsername(username);
		return projectRepo.findByUser(user);
	}
	
	
	//Update Services
	@Override
	public Update createUpdate(Update update, String projectTitle){
		update.setProject(projectRepo.findByTitle(projectTitle));
		update.setDate(new Timestamp(new Date().getTime()));
		return updateRepo.save(update);
	}
	
	public List<Update> getAllUpdatesByProjectOrderByDateDesc(String projectTitle){
		Project project = projectRepo.findByTitle(projectTitle);
		return updateRepo.findAllByProjectOrderByDateDesc(project);
		
	}

	
	//Category Services
	@Override
	public Category categoryById(int id) {
		return categoryRepo.findById(id);
	}

	
	//Description Services
	@Override
	public List<Description> descriptionsByProjectId(Integer id) {
		Project project = projectRepo.findById(id);
		return descriptionRepo.findByProjectOrderByOrderAsc(project);
	}

	@Override
	public Description createDescription(Description description, String projectTitle) {
		description.setProject(projectRepo.findByTitle(projectTitle));
		descriptionRepo.save(description);
		return description;
	}

	
	//Image Services
	
	
	
	@Override
	public List<String> imagesByProjectId(Integer id) {
		Project project = projectRepo.findById(id);
		
		List<Image> imageList = imageRepo.findByProjectOrderByOrderAsc(project);
		List<String> imageKeyList = new ArrayList<>();
		for(Image i : imageList){
			imageKeyList.add(i.getImage());
		}
		return imageKeyList;
	}
	@Override
	public List<String> getImagesByProjectTitle(String projectTitle){
		Project project = projectRepo.findByTitle(projectTitle);
		
		List<Image> imageList = imageRepo.findByProjectOrderByOrderAsc(project);
		List<String> imageKeyList = new ArrayList<>();
		for(Image i : imageList){
			imageKeyList.add(i.getImage());
		}
		System.out.println("inside getImagesByProjecttitle service");
		return imageKeyList;
	}
	
	
	@Override
	public Image createImage(String imageKey, File imageFile, String projectTitle) {
		
		System.out.println("imageKey: " + imageKey);
		System.out.println("projectTitle: " + projectTitle);
		
		final String bucketName = "fishtankbucket";
		
		Image image = new Image();
		System.out.println("inside create image service");
		List<Image> imageList = imageRepo.findByProjectOrderByOrderDesc(projectRepo.findByTitle(projectTitle));
		if(imageList.isEmpty()){
			System.out.println("imageList is empty");
			image.setOrder(1);
		}else{
			System.out.println("imageList is not empty");
			image.setOrder(imageList.get(0).getOrder()+1);
		}
		image.setProject(projectRepo.findByTitle(projectTitle));
		image.setImage(imageKey);
		imageRepo.save(image);
		
		AWSCredentials credentials = new ProfileCredentialsProvider().getCredentials();
		final AmazonS3Client amazonS3Client = new AmazonS3Client(credentials);
		
		long lengthOfFileToUpload;
		
		//File imageFile = new File(imageFilePath);
		{
		lengthOfFileToUpload = imageFile.length();
		PutObjectRequest putObjectRequest = new PutObjectRequest("fishtankbucket", imageKey, imageFile);
		ObjectMetadata  objectMetadata = new ObjectMetadata();
		objectMetadata.setContentLength(lengthOfFileToUpload);
		putObjectRequest.withMetadata(objectMetadata);
		amazonS3Client.putObject(putObjectRequest);
		}
		{
		URL url = amazonS3Client.generatePresignedUrl(bucketName,imageKey, Date.from(Instant.now().plus(5, ChronoUnit.MINUTES)));
		System.out.println(url);
		}
		
		return null;
	}
	
	public Dimension getScaledDimension(Dimension imgSize, Dimension boundary){
		
		int original_width = imgSize.width;
	    int original_height = imgSize.height;
	    int bound_width = boundary.width;
	    int bound_height = boundary.height;
	    int new_width = original_width;
	    int new_height = original_height;

	    // first check if we need to scale width
	    if (original_width > bound_width) {
	        //scale width to fit
	        new_width = bound_width;
	        //scale height to maintain aspect ratio
	        new_height = (new_width * original_height) / original_width;
	    }

	    // then check if we need to scale even with the new height
	    if (new_height > bound_height) {
	        //scale height to fit instead
	        new_height = bound_height;
	        //scale width to maintain aspect ratio
	        new_width = (new_height * original_width) / original_height;
	    }

	    return new Dimension(new_width, new_height);
	}
	
	//Investment Services
	@Override
	public List<Investment> investmentsByUsername(String username) {
		User user = userRepo.findByUsername(username);
		return investmentRepo.findByUserOrderByDateDesc(user);
	}

	@Override
	public List<Investment> investmentsByProjId(Integer id) {
		Project project = projectRepo.findById(id);
		return investmentRepo.findByProjectOrderByDateDesc(project);
	}

	@Override
	public Investment createInvestment(Investment investment, String username, String projectTitle) {
		investment.setUser(userRepo.findByUsername(username));
		investment.setProject(projectRepo.findByTitle(projectTitle));
		investment.setDate(new Timestamp(new Date().getTime()));
		return investmentRepo.save(investment);
	}
	
	
	//Review Services
	public Review createReview(Review review, String username, int projectId) {
		review.setUser(userRepo.findByUsername(username));
		review.setProject(projectRepo.findById(projectId));
		review.setDate(new Timestamp(new Date().getTime()));
		return reviewRepo.save(review);
	}
	
	@Override
	public List<Review> getReviewsByUsername(String username) {
		User user = userRepo.findByUsername(username);
		return reviewRepo.findByUserOrderByDateDesc(user);
	}

	@Override
	public List<Review> getReviewsByProjectId(Integer id) {
		Project project = projectRepo.findById(id);
		return reviewRepo.findByProjectOrderByDateDesc(project);
	}
	
}
