package com.tj.rj.livro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.tj.rj.livro.domain.Assunto;
import com.tj.rj.livro.dto.AssuntoDto;
import com.tj.rj.livro.exeptions.ObjectNotFoundException;
import com.tj.rj.livro.repositories.AssuntoRepository;

import jakarta.validation.Valid;

@Service
public class AssuntoService {

	@Autowired
	AssuntoRepository assuntoRepository;

	public Assunto findById(Long id) {
		Optional<Assunto> obj = this.assuntoRepository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + " Tipo:" + Assunto.class.getName()));
	}

	public List<Assunto> findAll() {
		return assuntoRepository.findAll();
	}
	
	public List<Assunto> findAllPorLivro(@Param(value = "idLivro") @Valid Long idLivro) {
		return assuntoRepository.findAllByLivro(idLivro);
	}

	
	public Assunto salvar(Assunto assunto) {
		assunto.setId(null);
		return assuntoRepository.save(assunto);
	}

	public Assunto update(Long id, AssuntoDto dto) {
		Assunto assunto = findById(id);
		assunto.setDescricao(dto.getDescricao());

		return assuntoRepository.save(assunto);
	}

	public void delete(Long id) {
		findById(id);
		try {
			assuntoRepository.deleteById(id);
		}catch ( DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Assunto não pode ser deletado, possui livros associados.");
		}
	}
}
