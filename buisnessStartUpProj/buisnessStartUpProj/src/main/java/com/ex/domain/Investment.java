package com.ex.domain;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name="cf_investments")
public class Investment {
	
	@Id
	@Column(name="i_id")
	@SequenceGenerator(allocationSize=1, name="investmentSeq", sequenceName="investment_sequence")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="investmentSeq")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="u_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="p_id")
	private Project project;
	
	@Column(name="i_percent")
	private double percent;
	
	@Column(name="i_amount")
	private int amount;
	
	@Column(name="i_date")
	private Timestamp date;

	public Investment() {}

	public Investment(Integer id, User user, Project project, double percent, int amount, Timestamp date) {
		super();
		this.id = id;
		this.user = user;
		this.project = project;
		this.percent = percent;
		this.amount = amount;
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

	public double getPercent() {
		return percent;
	}

	public void setPercent(double percent) {
		this.percent = percent;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Investment [id=" + id + ", user=" + user + ", project=" + project + ", percent=" + percent + ", amount="
				+ amount + ", date=" + date + "]";
	}
}
