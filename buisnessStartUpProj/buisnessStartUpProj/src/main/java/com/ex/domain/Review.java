package com.ex.domain;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name="cf_review")
public class Review{
	
	@Id
	@Column(name="r_id")
	@SequenceGenerator(allocationSize=1, name="reviewSeq", sequenceName="review_sequence")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="reviewSeq")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="u_id")
	private User user;

	@ManyToOne
	@JoinColumn(name="p_id")
	private Project project;
	
	@Column(name="r_comment")
	private String comment;
	
	@Column(name="r_stars")
	private int stars;
	
	@Column(name="r_date")
	private Timestamp date;
	
	public Review() {}

	public Review(Integer id, User user, Project project, String comment, int stars, Timestamp date) {
		super();
		this.id = id;
		this.user = user;
		this.project = project;
		this.comment = comment;
		this.stars = stars;
		this.date = date;
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

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getStars() {
		return stars;
	}

	public void setStars(int stars) {
		this.stars = stars;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Review [id=" + id + ", user=" + user + ", project=" + project + ", comment=" + comment + ", stars="
				+ stars + ", date=" + date + "]";
	}
	
	
}
