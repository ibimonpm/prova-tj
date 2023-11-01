package com.tj.rj.livro.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tj.rj.livro.domain.Assunto;

public interface AssuntoRepository extends JpaRepository<Assunto, Long>{
	
	@Query(" SELECT l FROM Assunto l JOIN l.livros a WHERE a.id = :idLivro")
	List<Assunto> findAllByLivro(@Param(value = "idLivro") Long idLivro);
}
