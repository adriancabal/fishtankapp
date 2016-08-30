package com.ex.domain;

import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name="cf_update")
public class Update {
	@Id
	@Column(name="up_id")
	@SequenceGenerator(allocationSize=1, name="upSeq", sequenceName="up_sequence")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="upSeq")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="up_project")
	private Project project;
	
	@Column(name="up_title")
	private String title;
	
	@Column(name="up_description")
	private String description;
	
	@Column(name="up_date")
	private Timestamp date;
	
	public Update() {}
	public Update(Integer id, Project project, String title, String description, Timestamp date) {
		super();
		this.id = id;
		this.project = project;
		this.title = title;
		this.description = description;
		this.date = date;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Timestamp getDate() {
		return date;
	}
	public void setDate(Timestamp date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Update [id=" + id + ", project=" + project + ", title=" + title + ", description=" + description
				+ ", date=" + date + "]";
	}
}
