import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livros/livro.service';
import { AutorService } from '../autor/autor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livros/livro.model';
import { Autor } from '../autor/autor.model';
import { Vla } from './vla.model';
import { VlaService } from './vla.service';
@Component({
  selector: 'app-vincularlivroautor',
  templateUrl: './vincularlivroautor.component.html',
  styleUrls: ['./vincularlivroautor.component.css'],
})
export class VincularlivroautorComponent implements OnInit {
  autores: Autor[] = [];
  optionAutor: Autor[] = [];

  livro: Livro = {
    codI: 0,
    titulo: '',
    editora: '',
    edicao: 0,
    anoPublicacao: 0,
    mediaPrecoStr: '',
    autores:[{id:0, nome:''}],
    assunto:{id:0, descricao:""}
  };

  vla: Vla = {
    codI: 0,
    titulo: '',
    editora: '',
    edicao: 0,
    anoPublicacao: 0,
    mediaPrecoStr: '',
    autores:  [ {id: 0} ]
  };

  constructor(
    private service: LivroService,
    private serviceAutor: AutorService,
    private serviceVla: VlaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.livro.codI = Number.parseInt(
      this.route.snapshot.paramMap.get('codI')!
    );

    this.findByAutores();
    this.findByLivroPorId();
  }

  findByLivroPorId(): void {
    this.service.findById(this.livro.codI!).subscribe((resposta) => {
      this.livro.codI = resposta.codI;
      this.livro.titulo = resposta.titulo;
      this.livro.editora = resposta.editora;
      this.livro.edicao = resposta.edicao;
      this.livro.anoPublicacao = resposta.anoPublicacao;
    });
  }

  async findByAutores(): Promise<Autor[]> {
    return new Promise((resolver) => {
      setTimeout(() => {
        this.serviceAutor.findAll().subscribe((resposta) => {
          console.log(resposta);
          this.autores = resposta;
        });
      }, 1000);
    });
  }

  vincular(): void {

    this.vla.codI = this.livro.codI;
    this.vla.titulo = this.livro.titulo;
    this.vla.editora = this.livro.editora;
    this.vla.edicao = this.livro.edicao;
    this.vla.anoPublicacao = this.livro.anoPublicacao;
    this.vla.autores= [ {id: 0} ]

    this.optionAutor.forEach((autor) => {
      const autorObj = { id: autor.id! };
      this.vla.autores?.push(autorObj);
    });

    this.vla.autores = this.vla.autores?.filter((autor) => autor.id !== 0)!;

    const objetoJSON = JSON.stringify(this.vla, null, 2);
    console.log(objetoJSON);

    this.serviceVla.vincular(this.vla).subscribe({
      next: (resposta) => {
        this.router.navigate(['livros']);
        this.service.mensagem('Livro atualizado com sucesso!');
      },
      error: (err) => {
        this.service.mensagem(
          err + 'Validar se todos os campos estão preenchidos corretamente.'
        );
      },
    });
  }

  cancel(): void {
    this.router.navigate(['livros']);
  }
}
