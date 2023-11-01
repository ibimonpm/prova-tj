package com.tj.rj.livro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tj.rj.livro.domain.Autor;

public interface AutorRepository extends JpaRepository<Autor, Long>{

}
