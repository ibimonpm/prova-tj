package com.tj.rj.livro.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AssuntoDto {
    private Long id;
	
    @NotEmpty(message =  "Campo Descrição deve ser preenchido!")
   	@Length(min = 3, max = 40, message = "Mínimo 3 e no máximo 40 caracteres.")
    private String descricao;	
	
    private List<LivroDto> livros;
}
