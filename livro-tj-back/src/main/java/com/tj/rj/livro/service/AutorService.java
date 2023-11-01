package com.tj.rj.livro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.tj.rj.livro.domain.Autor;
import com.tj.rj.livro.dto.AutorDto;
import com.tj.rj.livro.exeptions.ObjectNotFoundException;
import com.tj.rj.livro.repositories.AutorRepository;

@Service
public class AutorService {

	@Autowired
	AutorRepository autorRepository;

	public Autor findById(Long id) {
		Optional<Autor> obj = this.autorRepository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + " Tipo:" + Autor.class.getName()));
	}

	public List<Autor> findAll() {
		return autorRepository.findAll();
	}

	public Autor salvar(Autor autor) {
		autor.setId(null);
		return autorRepository.save(autor);
	}

	public Autor update(Long id, AutorDto dto) {
		Autor autor = findById(id);
		autor.setNome(dto.getNome());

		return autorRepository.save(autor);
	}

	public void delete(Long id) {
		findById(id);
		try {
			autorRepository.deleteById(id);
		}catch ( DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Autor não pode ser deletado, possui livros associados.");
		}
	}
}
