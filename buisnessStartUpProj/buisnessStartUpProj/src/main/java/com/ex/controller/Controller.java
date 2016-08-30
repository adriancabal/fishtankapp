package com.ex.controller;

import java.awt.Dimension;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;


import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.annotation.MultipartConfig;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ex.domain.Category;
import com.ex.domain.Description;
import com.ex.domain.Image;
import com.ex.domain.Investment;
import com.ex.domain.Project;
import com.ex.domain.Review;
import com.ex.domain.Update;
import com.ex.domain.User;
import com.ex.service.ServiceInterface;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@RestController
@MultipartConfig(fileSizeThreshold=2097152)
public class Controller {
	
	@Autowired
	private ServiceInterface service;
	

	/*
	 *   USER
	 */
	@RequestMapping(value="login/{username}+{password}", method=RequestMethod.GET)
 	public Object authenticate(@PathVariable String username, @PathVariable String password){
 		Object object = service.authenticate(username, password);
 		if(object!=null){
 			return object;
 		}else{
 			return null;
 		}
 	}
	//find user
	@RequestMapping(value="user/{username}",method=RequestMethod.GET)
	public User userByUsername(@PathVariable String username){
		return service.findUser(username);
	}
	//update user
	@RequestMapping(value="user/{username}",method=RequestMethod.PUT)
	public User updateUser(@RequestBody User user, @PathVariable String username){
		return service.updateUser(user, username);
	}

	
	//PROJECT CONTROLLERS
	@RequestMapping(value="project/{username}+{categoryId}+{duration}", method=RequestMethod.POST)
 	public Project createProject(@RequestBody Project project, @PathVariable String username, @PathVariable int categoryId, @PathVariable int duration){
 		System.out.println(project.getLocation());
		return service.createProject(project, username, categoryId, duration);
 	}
	
	@RequestMapping(value="project/{projectTitle}", method=RequestMethod.PUT)
 	public Project updateProject(@RequestBody Project project, @PathVariable String projectTitle){
 		return service.updateProject(project, projectTitle);
 	}
	
	@RequestMapping(value="project/{orderBy}", method=RequestMethod.GET)
 	public List<Project> getAllProjects(@PathVariable String orderBy){
		
		if(orderBy.equals("goal")){
			return service.getAllProjectsOrderByGoalDesc();
		}else if(orderBy.equals("currentAmount")){
			return service.getAllProjectsOrderByCurrentAmountDesc();
		}else if(orderBy.equals("ratio")){
			return service.getAllProjectsOrderByRatioAsc();
		}else if(orderBy.equals("rating")){
			return service.getAllProjectsOrderByRatingDesc();
		}else if(orderBy.equals("startDate")){
			return service.getAllProjectsOrderByStartDateDesc();
		}else if(orderBy.equals("endDate")){
			return service.getAllProjectsOrderByEndDateAsc();
		}
		return null;
 	}
	
	@RequestMapping(value="project/category/{catId}", method=RequestMethod.GET)
	public List<Project> getAllProjects(@PathVariable int catId){
		return service.getAllProjectsByCategory(catId);
	}
	
	@RequestMapping(value="project/user/{username}", method=RequestMethod.GET)
	public List<Project> getProjectsByUser(@PathVariable String username){
		return service.getProjectsByUser(username);
	}
	

	/*
	 *   UPDATE CONTROLLERS
	 */
	@RequestMapping(value="update/{projectTitle}", method=RequestMethod.POST)
 	public Update createUpdate(@RequestBody Update update, @PathVariable String projectTitle){
 		return service.createUpdate(update, projectTitle);
 	}
	
	@RequestMapping(value="update/{projectTitle}", method=RequestMethod.GET)
 	public List<Update> getAllUpdatesByProjectOrderByDateDesc(@PathVariable String projectTitle){
 		return service.getAllUpdatesByProjectOrderByDateDesc(projectTitle);
 	}
	


	/*
	 *   INVESTMENT CONTROLLERS
	 */
	
	@RequestMapping(value="investment/{username}+{projectTitle}", method=RequestMethod.POST)
 	public Investment createInvestment(@RequestBody Investment investment, @PathVariable String username, @PathVariable String projectTitle){
 		return service.createInvestment(investment, username, projectTitle);
 	}
	
	@RequestMapping(value="investment/user/{username}", method=RequestMethod.GET)
	public List<Investment> getInvestmentByUser(@PathVariable String username){
		return service.investmentsByUsername(username);
	}
	
	@RequestMapping(value="investment/project/{projId}", method=RequestMethod.GET)
	public List<Investment> getInvestmentByProj(@PathVariable int projId){
		return service.investmentsByProjId(projId);
	}
	
	
	//DESCRIPTION CONTROLLERS
	@RequestMapping(value="description/{projectTitle}", method=RequestMethod.POST)
	public Description createDescription(@RequestBody Description description, @PathVariable String projectTitle){
		return service.createDescription(description, projectTitle);
	}
	
	@RequestMapping(value="description/{id}", method=RequestMethod.GET)
	public List<Description> getDescriptions(@PathVariable int id){
		return service.descriptionsByProjectId(id);
	}
	
	
	//CATERGORIES CONTROLLERS
	@RequestMapping(value="categories/{id}", method=RequestMethod.GET)
	public Category getCategories(@PathVariable int id){
		return service.categoryById(id);
	}
	
	
	//IMAGE CONTROLLERS
	@RequestMapping(value="image/{id}", method=RequestMethod.GET)
	public List<String> getImages(@PathVariable int id){
		return service.imagesByProjectId(id);
	}
	
	@RequestMapping(value="image/projectTitle/{projectTitle}", method=RequestMethod.GET)
	public List<String> getImagesByProjectTitle(@PathVariable String projectTitle){
		System.out.println("inside getImagesByProjecttitle controller");
		return service.getImagesByProjectTitle(projectTitle);
	}
	
	
	//@RequestBody MultipartFile key
	@RequestMapping(value="image/{imageKey}/{projectTitle}", method=RequestMethod.POST)
	public Image createImage(@RequestBody String completeImageData, @PathVariable String imageKey, @PathVariable String projectTitle) throws IOException{
			
			System.out.println("show me what you got");
			System.out.println("imageKey: " + imageKey);
			System.out.println("projectTitle: " + projectTitle);
			System.out.println("completeImageData: " + completeImageData);
			//System.out.println(key.getOriginalFilename());
			
			
			String imageDataBytes = completeImageData.substring(completeImageData.indexOf(",")+1);
			Base64 base64 = new Base64();
			InputStream inputStream = new ByteArrayInputStream(base64.decode(imageDataBytes.getBytes()));
			
			BufferedImage srcImage = ImageIO.read(inputStream);
			
			Dimension imgSize = new Dimension(srcImage.getWidth(), srcImage.getHeight());
			Dimension boundary = new Dimension(400, 300);
			Dimension scaledDimension = service.getScaledDimension(imgSize, boundary);
			
			int scaledWidth = scaledDimension.width;
			int scaledHeight = scaledDimension.height;
			BufferedImage scaledImage = new BufferedImage(scaledWidth, scaledHeight, BufferedImage.TYPE_INT_RGB);
			scaledImage.getGraphics().drawImage(srcImage, 0, 0, scaledWidth, scaledHeight, null);
			
			File imgFile= new File("C:/Users/Adrian/Desktop/image.jpg");
			
			ImageIO.write(scaledImage, "jpg", imgFile);
			//ImageIO.write(srcImage, "jpg", new File(path + ".jpg"));
			
			service.createImage(imageKey, imgFile, projectTitle);
			
			return null;
	}
	
	
	/*
	 *   REVIEW CONTROLLERS
	 */	
	@RequestMapping(value="review/{username}+{projectId}", method=RequestMethod.POST)
 	public Review createReview(@RequestBody Review review, @PathVariable String username, @PathVariable int projectId){
 		return service.createReview(review, username, projectId);
 	}
	
	@RequestMapping(value="review/username/{username}", method=RequestMethod.GET)
 	public List<Review> getReviewsByUsername(@PathVariable String username){
 		return service.getReviewsByUsername(username);
 	}
	
	@RequestMapping(value="review/projectId/{projectId}", method=RequestMethod.GET)
 	public List<Review> getReviewsByProjectId(@PathVariable Integer projectId){
 		return service.getReviewsByProjectId(projectId);
 	}
	
	/*
	 *  Email Controller
	 */
	
	@RequestMapping(value="email/{firstname}/{lastname}/{subject}/{senderUsername}", method=RequestMethod.POST)
 	public void sendEmail(@RequestBody String emailMessage, @PathVariable String firstname, @PathVariable String lastname, @PathVariable String subject, @PathVariable String senderUsername){
 		
		System.out.println("show me what you got");
		//Email Notification
		
		final String uname = "adriancabal888@gmail.com";
	       final String pword = "eatbanana";

	       Properties props = new Properties();
	       props.put("mail.smtp.starttls.enable", "true");
	       props.put("mail.smtp.auth", "true");

	       props.put("mail.smtp.host", "smtp.gmail.com");
	       props.put("mail.smtp.port", "587");

	       Session session = Session.getInstance(props,
	         new javax.mail.Authenticator() {
	           protected PasswordAuthentication getPasswordAuthentication() {
	               return new PasswordAuthentication(uname, pword);
	           }
	         });

	       try {
	    	   
	    	   
	           Message message = new MimeMessage(session);
	           message.setFrom(new InternetAddress("adriancabal888@gmail.com"));
	           message.setRecipients(Message.RecipientType.TO,
	               InternetAddress.parse("adriancabal888@gmail.com"));
	           message.setSubject("Sent From FishTank:  " + subject);
	           message.setText("Hello " + firstname + " " + lastname +", \n \n \n" 
	           + emailMessage
	           + "\n \n \n"
	           + "From, \n \n" + senderUsername);

	           Transport.send(message);


	       } catch (MessagingException e) {
	           throw new RuntimeException(e);
	       }
		//end Email Notification
		
		 
 		
 		
 		
 	}

}
