/**
 * 
 */
package com.tj.rj.livro.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tj.rj.livro.domain.Livro;

/**
 * ibimon.morais
 */
public interface LivroRepository extends JpaRepository<Livro, Long>{
	@Query(" Select o From Livro o Where o.assunto.id = :idAssunto ORDER BY o.titulo")
	List<Livro> findAllByAssunto(@Param(value = "idAssunto") Long idAssunto);
	
	@Query(" SELECT l FROM Livro l JOIN l.autores a WHERE a.id = :idAutor")
	List<Livro> findAllByAutor(@Param(value = "idAutor") Long idAutor);
}
