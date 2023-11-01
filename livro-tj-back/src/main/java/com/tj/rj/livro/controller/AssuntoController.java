/**
 * 
 */
package com.tj.rj.livro.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tj.rj.livro.domain.Assunto;
import com.tj.rj.livro.domain.Livro;
import com.tj.rj.livro.dto.AssuntoDto;
import com.tj.rj.livro.dto.LivroDto;
import com.tj.rj.livro.service.AssuntoService;
import com.tj.rj.livro.service.LivroService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/assuntos")
public class AssuntoController {
	@Autowired
	private AssuntoService assuntoService;
	
	@GetMapping
	public ResponseEntity<List<Assunto>> findAll(){
		List<Assunto>  obj = assuntoService.findAll();
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Assunto> findById(@Valid @PathVariable Long id){
		Assunto obj = assuntoService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/livros/{idLivro}")	
	public ResponseEntity<List<Assunto>> findAllPorAssunto(@Valid @PathVariable Long idLivro){
		List<Assunto> listaDto = assuntoService.findAllPorLivro(idLivro);		
		return ResponseEntity.ok().body(listaDto); 
	}
	
	@PostMapping
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<Assunto> adicionar(@Valid @RequestBody Assunto assunto) {
		
		assunto = assuntoService.salvar(assunto);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/{id}")
				.buildAndExpand(assunto.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Assunto> update(@PathVariable Long  id, @Valid @RequestBody AssuntoDto dto){
		Assunto novo = assuntoService.update(id, dto);
		return ResponseEntity.ok().body(novo);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@Valid @PathVariable Long id){
		assuntoService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
