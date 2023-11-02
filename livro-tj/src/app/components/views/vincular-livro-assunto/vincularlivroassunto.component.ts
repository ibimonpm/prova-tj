import { Component } from '@angular/core';
import { Assunto } from '../assunto/assunto.model';
import { Livro } from '../livros/livro.model';
import { LivroService } from '../livros/livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from '../autor/autor.service';
import { Autor } from '../autor/autor.model';
import { Vlass } from './vlass.model';
import { VlassService } from './vlass.service';
import { AssuntoService } from '../assunto/assunto.service';

@Component({
  selector: 'app-vincularlivroassunto',
  templateUrl: './vincularlivroassunto.component.html',
  styleUrls: ['./vincularlivroassunto.component.css']
})
export class VincularlivroassuntoComponent {
  assuntos: Assunto[] = [];
  optionAssunto: Assunto = {
    id: 0,
    descricao: ''
  };

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

  vlass: Vlass = {
    codI: 0,
    titulo: '',
    editora: '',
    edicao: 0,
    anoPublicacao: 0,
    mediaPrecoStr: '',
    assunto:  {id: 0, descricao: ""},
  };

  constructor(
    private service: LivroService,
    private serviceVlass: VlassService,
    private serviceAssunto: AssuntoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.livro.codI = Number.parseInt(
      this.route.snapshot.paramMap.get('codI')!
    );

    this.findByAssunto();
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

  async findByAssunto(): Promise<Assunto[]> {
    return new Promise((resolver) => {
      setTimeout(() => {
        this.serviceAssunto.findAll().subscribe((resposta) => {
          console.log(resposta);
          this.assuntos = resposta;
        });
      }, 1000);
    });
  }

  vincular(): void {

    this.vlass.codI = this.livro.codI;
    this.vlass.titulo = this.livro.titulo;
    this.vlass.editora = this.livro.editora;
    this.vlass.edicao = this.livro.edicao;
    this.vlass.anoPublicacao = this.livro.anoPublicacao;
    this.vlass.assunto= {id: 0};

    this.vlass.assunto = this.optionAssunto;

    const objetoJSON = JSON.stringify(this.vlass, null, 2);
    console.log(objetoJSON);

    this.serviceVlass.vincular(this.vlass).subscribe({
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
