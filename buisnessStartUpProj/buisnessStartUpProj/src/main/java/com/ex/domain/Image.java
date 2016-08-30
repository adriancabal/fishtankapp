package com.ex.domain;

import javax.persistence.*;

@Entity
@Table(name="cf_images")
public class Image {
	@Id
	@Column(name="i_id")
	@SequenceGenerator(allocationSize=1, name="imgSeq", sequenceName="img_sequence")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="imgSeq")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="p_id")
	private Project project;
	
	@Column(name="i_image")
	private String image;
	
	@Column(name="i_order")
	private int order;
	
	public Image() {}
	

	public Image(Integer id, Project project, String image, int order) {
		super();
		this.id = id;
		this.project = project;
		this.image = image;
		this.order = order;
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
	public int getOrder() {
		return order;
	}


	public void setOrder(int order) {
		this.order = order;
	}


	@Override
	public String toString() {
		return "Image [id=" + id + ", project=" + project + ", image=" + image + ", order=" + order + "]";
	}


	
}
