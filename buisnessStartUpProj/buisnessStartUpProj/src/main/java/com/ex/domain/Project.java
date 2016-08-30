package com.ex.domain;

import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name="cf_project")
public class Project {
	@Id
	@Column(name="p_id")
	@SequenceGenerator(allocationSize=1, name="projSeq", sequenceName="proj_sequence")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="projSeq")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="u_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="c_id")
	private Category category;
	
	@Column(name="p_title")
	private String title;
	
	@Column(name="p_locaton")
	private String location;
	
	@Column(name="p_link")
	private String link;
	
	@Column(name="p_goal")
	private int goal;
	
	@Column(name="p_current_amount")
	private int currentAmount;
	
	@Column(name="p_ratio")
	private int ratio;
	
	@Column(name="p_rating")
	private double rating;
	
	@Column(name="p_start_date")
	private Timestamp startDate;
	
	@Column(name="p_end_date")
	private Timestamp endDate;
	
	public Project() {}
	public Project(Integer id, User user, Category category, String title, String location, String link, int goal,
			int currentAmount, int ratio, double rating, Timestamp startDate, Timestamp endDate) {
		super();
		this.id = id;
		this.user = user;
		this.category = category;
		this.title = title;
		this.location = location;
		this.link = link;
		this.goal = goal;
		this.currentAmount = currentAmount;
		this.ratio = ratio;
		this.rating = rating;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public int getGoal() {
		return goal;
	}
	public void setGoal(int goal) {
		this.goal = goal;
	}
	public int getCurrentAmount() {
		return currentAmount;
	}
	public void setCurrentAmount(int currentAmount) {
		this.currentAmount = currentAmount;
	}
	public int getRatio() {
		return ratio;
	}
	public void setRatio(int ratio) {
		this.ratio = ratio;
	}
	
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	public Timestamp getStartDate() {
		return startDate;
	}
	public void setStartDate(Timestamp startDate) {
		this.startDate = startDate;
	}
	public Timestamp getEndDate() {
		return endDate;
	}
	public void setEndDate(Timestamp endDate) {
		this.endDate = endDate;
	}
	
	@Override
	public String toString() {
		return "Project [id=" + id + ", user=" + user + ", category=" + category + ", title=" + title + ", location="
				+ location + ", link=" + link + ", goal=" + goal + ", currentAmount=" + currentAmount + ", ratio="
				+ ratio + ", rating=" + rating + ", startDate=" + startDate + ", endDate=" + endDate + "]";
	}
	
	
	
}
