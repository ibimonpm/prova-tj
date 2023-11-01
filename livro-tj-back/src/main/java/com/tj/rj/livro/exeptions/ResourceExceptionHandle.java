package com.tj.rj.livro.exeptions;

import org.hibernate.ObjectNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.servlet.ServletRequest;

/**
 * ibimon.morais
 */
@ControllerAdvice
public class ResourceExceptionHandle {
	@ExceptionHandler(ObjectNotFoundException.class)
	public ResponseEntity<StandardError> objectoNotFoundException(ObjectNotFoundException obj, ServletRequest request){
		StandardError error = new StandardError(
				System.currentTimeMillis(),
				HttpStatus.NOT_FOUND.value(),
				obj.getMessage());
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}
	

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<StandardError> dataIntegrityViolationException(DataIntegrityViolationException obj, ServletRequest request){
		StandardError error = new StandardError(
				System.currentTimeMillis(),
				HttpStatus.BAD_REQUEST.value(),
				obj.getMessage());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<StandardError> methodArgumentNotValidException(MethodArgumentNotValidException obj, ServletRequest request){
		ValidationError error = new ValidationError(
				System.currentTimeMillis(),
				HttpStatus.BAD_REQUEST.value(),
				"Erro na validação dos campos.");
		
		for(FieldError x : obj.getBindingResult().getFieldErrors()) 
		{
			error.addErros(x.getField(), x.getDefaultMessage());
		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
	}
}
