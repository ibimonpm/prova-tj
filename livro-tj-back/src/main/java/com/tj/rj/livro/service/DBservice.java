package com.tj.rj.livro.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tj.rj.livro.domain.Assunto;
import com.tj.rj.livro.domain.Autor;
import com.tj.rj.livro.domain.Livro;
import com.tj.rj.livro.repositories.AssuntoRepository;
import com.tj.rj.livro.repositories.AutorRepository;
import com.tj.rj.livro.repositories.LivroRepository;

@Service
public class DBservice {
	@Autowired
	private AssuntoRepository  assuntoRepository;
	
	@Autowired
	private AutorRepository autorRepository;
	
	@Autowired
	private LivroRepository livroRepository; 
	
	
	public void instanciaBaseDeDados() {
		Assunto c = new Assunto(null, "Informatica", new ArrayList<Livro>() );
		Autor a = new Autor(null, "Robert Martin", new HashSet<Livro>());
		
		Set<Autor> autores = new HashSet<>();
		autores.add(a);
		
		Livro l = new Livro(null, "Clean code", "Alta Books", 1, "2021", 200.10 , autores, c);
		
		c.getLivros().addAll(Arrays.asList(l));
		
		this.assuntoRepository.saveAll(Arrays.asList(c));
		this.autorRepository.saveAll(Arrays.asList(a));
		this.livroRepository.saveAll(Arrays.asList(l));
	}
}
