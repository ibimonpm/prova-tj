package com.tj.rj.livro.exeptions;

import java.util.ArrayList;
import java.util.List;

public class ValidationError extends StandardError{
	
	private List<FieldMessage> erros = new ArrayList<>();

	public ValidationError() {
		super();
	}

	public ValidationError(Long timesTamp, Integer statusCode, String message) {
		super(timesTamp, statusCode, message);
	}

	public List<FieldMessage> getErros() {
		return erros;
	}

	public void addErros(String fieldName , String message) {
		this.erros.add(new FieldMessage(fieldName, message));
	}

	
}
