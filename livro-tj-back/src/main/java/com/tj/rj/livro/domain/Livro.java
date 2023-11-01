/**
 * 
 */
package com.tj.rj.livro.domain;

import java.io.Serializable;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
@Entity
@Table(name = "livro")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Livro implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name = "id_livro_seq", sequenceName = "id_livro_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "id_livro_seq")
	@Column(name = "codI", updatable = false, insertable=false)
	@JsonProperty("codI")
    private Long id;
	
	@JsonProperty
	@Size(max = 40)
	@NotNull
    private String titulo;
	
	@JsonProperty
	@Size(max = 40)
	@NotNull
	private String editora;
	
	@JsonProperty
    private Integer edicao;
	
	@JsonProperty
	@Size(max = 4)
	private String anoPublicacao;
	
	@JsonProperty
    private Double mediaPreco;
    
    @JsonIgnore
    @ManyToMany(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @JoinTable(name = "livro_autor",
            joinColumns = @JoinColumn(name = "livro_id"),
            inverseJoinColumns = @JoinColumn(name = "autor_id"))
    private Set<Autor> autores;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "assunto_id")
    private Assunto assunto;
}
