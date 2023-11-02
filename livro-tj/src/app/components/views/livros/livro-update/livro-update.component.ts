import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css'],
})
export class LivroUpdateComponent {
  id_assunto: Number = 0;

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

  years: number[] = [];

  titulo = new FormControl('', [Validators.minLength(3)]);
  editora = new FormControl('', [Validators.minLength(3)]);

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.livro.codI = Number.parseInt(
      this.route.snapshot.paramMap.get('codI')!
    );
    console.log(this.route.snapshot.paramMap.get('codI')!);
    console.log(this.livro.codI);
    //this.id_assunto = Number.parseInt(this.route.snapshot.paramMap.get("id_assunto")!);
    this.service.findById(this.livro.codI!).subscribe((resposta) => {
      this.livro.codI = resposta.codI;
      this.livro.titulo = resposta.titulo;
      this.livro.editora = resposta.editora;
      this.livro.edicao = resposta.edicao;
      this.livro.anoPublicacao = resposta.anoPublicacao;
      this.livro.mediaPrecoStr = resposta.mediaPrecoStr;
    });
  }

  cancel(): void {
    this.router.navigate([`livros`]);
  }

  update(): void {
    this.service.update(this.livro).subscribe({
      next: () => {
        this.router.navigate([`livros`]);
        this.service.mensagem('Livro alterado com sucesso!');
      },
      error: (erro) => {
        this.router.navigate([`livros`]);
        this.service.mensagem('Erro ao altera novo livro, tente mais tarde!');
        console.log(erro);
      },
    });
  }

  getMessage() {
    if (this.titulo.invalid) {
      return 'O campo titulo deve conter entre 3 e 40 caracteres.';
    }
    if (this.editora.invalid) {
      return 'O campo editora deve conter entre 3 e 40 caracteres.';
    }

    return false;
  }
}
