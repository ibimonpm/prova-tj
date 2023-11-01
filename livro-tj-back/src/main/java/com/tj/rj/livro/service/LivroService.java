package com.tj.rj.livro.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.tj.rj.livro.domain.Assunto;
import com.tj.rj.livro.domain.Autor;
import com.tj.rj.livro.domain.Livro;
import com.tj.rj.livro.dto.AutorDto;
import com.tj.rj.livro.dto.LivroDto;
import com.tj.rj.livro.exeptions.ObjectNotFoundException;
import com.tj.rj.livro.repositories.AutorRepository;
import com.tj.rj.livro.repositories.LivroRepository;

@Service
public class LivroService {
	@Autowired
	LivroRepository livroRepository;
	@Autowired
	AssuntoService assuntoService;
	@Autowired
	AutorService autorService;
	@Autowired
	AutorRepository autorRepository;

	public Livro findById(Long id) {
		Optional<Livro> obj = this.livroRepository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + " Tipo:" + Livro.class.getName()));
	}

	public List<Livro> findAll() {
		return livroRepository.findAll();
	}

	public List<Livro> findAll(Long idAssunto) {
		return livroRepository.findAllByAssunto(idAssunto);
	}

	public List<Livro> findAllAutor(Long idAutor) {
		return livroRepository.findAllByAutor(idAutor);
	}

	public Livro salvar(Long idAssunto, Livro entidade, List<Long> idsAutores) {
		entidade.setId(null);
		entidade.setAssunto(assuntoService.findById(idAssunto));

		Set<Autor> autores = new HashSet<>();
		autores.addAll(autorRepository.findAllById(idsAutores));
		entidade.setAutores(autores);

		return livroRepository.save(entidade);
	}
	
	public Livro salvar(Livro entidade) {
		return livroRepository.save(entidade);
	}


	public Livro update(Long id, LivroDto dto) {
		Livro livro = findById(id);
		return updateData(dto, livro);
	}

	private Livro updateData(LivroDto dto, Livro livro) {
		livro.setTitulo(dto.getTitulo());
		livro.setEdicao(dto.getEdicao());
		livro.setEditora(dto.getEditora());
		livro.setMediaPreco(dto.getMediaPreco());
		
		if(dto.getAssunto() != null){
			livro.setAssunto(new Assunto(dto.getAssunto().getId(), dto.getAssunto().getDescricao(), null));
		}
		
		if(dto.getAutores() != null && !dto.getAutores().isEmpty()) {
			List<Long> idsAutores = dto.getAutores().stream().map(AutorDto::getId).collect(Collectors.toList());
			livro.setAutores(new HashSet<>(autorRepository.findAllById(idsAutores)));
		}

		return livroRepository.save(livro);
	}

	public void delete(Long id) {
		try {
			Livro livro = findById(id);
			livroRepository.delete(livro);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Livro não pode ser deletado.");
		}
	}

}
