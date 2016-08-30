package com.ex.domain;

import javax.persistence.*;

@Entity
@Table(name="cf_description")
public class Description {
	@Id
	@Column(name="d_id")
	@SequenceGenerator(allocationSize=1, name="descSeq", sequenceName="desc_sequence")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="descSeq")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="p_id")
	private Project project;
	
	@Column(name="d_text")
	private String text;
	
	@Column(name="d_order")
	private int order;
	
	public Description() {}

	public Description(Integer id, Project project, String text, int order) {
		super();
		this.id = id;
		this.project = project;
		this.text = text;
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

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
	
	
	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	@Override
	public String toString() {
		return "Description [id=" + id + ", project=" + project + ", text=" + text + ", order=" + order + "]";
	}

	
	
}
