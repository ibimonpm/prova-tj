package com.tj.rj.livro.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.tj.rj.livro.domain.Autor;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
public class AutorDto {

    private Long id;
	
	@NotEmpty(message =  "Campo Nome deve ser preenchido!")
	@Length(min = 3, max = 40, message = "Mínimo 3 e no máximo 40 caracteres.")
    private String nome;	

    private List<LivroDto> livros;
    
    public Autor toEntity() {
        return new Autor(id, nome, null);
    }
}
