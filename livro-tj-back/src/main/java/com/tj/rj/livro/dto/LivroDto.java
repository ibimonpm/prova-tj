/**
 * 
 */
package com.tj.rj.livro.dto;

import java.util.Set;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@RequiredArgsConstructor 
@Getter
@Setter
@ToString
public class LivroDto {
	
    private Long id;
	
    @NotEmpty(message =  "Campo Titulo deve ser preenchido!")
	@Length(min = 3, max = 40, message = "Mínimo 3 e no máximo 40 caracteres.")
    private String titulo;
	
    @NotEmpty(message =  "Campo Editora deve ser preenchido!")
	@Length(min = 3, max = 40, message = "Mínimo 3 e no máximo 40 caracteres.")
	private String editora;
	    
    private Integer edicao;
	
    private Double mediaPreco;
	
    @Size(max = 4)
	private String anoPublicacao;

    private Set<AutorDto> autores;
    
    private AssuntoDto assunto;
    
}
