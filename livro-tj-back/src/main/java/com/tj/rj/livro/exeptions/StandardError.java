package com.tj.rj.livro.exeptions;

public class StandardError {

	private Long timesTamp;
	private Integer statusCode;
	private String message;
	
	public StandardError() {
		super();
	}
	public StandardError(Long timesTamp, Integer statusCode, String message) {
		super();
		this.timesTamp = timesTamp;
		this.statusCode = statusCode;
		this.message = message;
	}
	public Long getTimesTamp() {
		return timesTamp;
	}
	public void setTimesTamp(Long timesTamp) {
		this.timesTamp = timesTamp;
	}
	public Integer getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(Integer statusCode) {
		this.statusCode = statusCode;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
