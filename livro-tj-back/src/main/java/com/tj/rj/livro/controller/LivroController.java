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

import com.tj.rj.livro.domain.Livro;
import com.tj.rj.livro.dto.LivroDto;
import com.tj.rj.livro.service.LivroService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/livros")
public class LivroController {
	@Autowired
	private LivroService livroService;
	
	@GetMapping
	public ResponseEntity<List<Livro>> findAll(){
		List<Livro>  obj = livroService.findAll();
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Livro> findById(@PathVariable Long id){
		Livro obj = livroService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/assunto/{idAssunto}")	
	public ResponseEntity<List<Livro>> findAllPorAssunto(@Valid @PathVariable Long idAssunto){
		List<Livro> listaDto = livroService.findAll(idAssunto);		
		return ResponseEntity.ok().body(listaDto); 
	}
	
	@PostMapping
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<Livro> adicionar(@Valid @RequestBody Livro livro) {
		
		livro = livroService.salvar(livro);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/livros/{id}")
				.buildAndExpand(livro.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Livro> update(@PathVariable Long  id, @Valid @RequestBody LivroDto dto){
		Livro novo = livroService.update(id, dto);
		return ResponseEntity.ok().body(novo);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		livroService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
