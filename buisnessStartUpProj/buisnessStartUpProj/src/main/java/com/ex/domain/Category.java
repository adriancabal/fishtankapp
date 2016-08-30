package com.ex.domain;

import javax.persistence.*;

@Entity
@Table(name="cf_category")
public class Category {
	@Id
	@Column(name="c_id")
	private Integer id;
	
	@Column(name="c_name")
	private String name;

	public Category() {}
	public Category(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + "]";
	}
}
