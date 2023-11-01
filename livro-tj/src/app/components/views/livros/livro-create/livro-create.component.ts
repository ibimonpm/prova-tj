import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css'],
})
export class LivroCreateComponent implements OnInit {
  id_cat: String = '';

  livro: Livro = {
    codI: '',
    titulo: '',
    editora: '',
    edicao: 0,
    anoPublicacao: 0,
    valorMedioVenda: 0,
  };

  years: number[] = [];

  titulo = new FormControl('', [Validators.minLength(3)]);
  editora = new FormControl('', [Validators.minLength(3)]);
  edicao = new FormControl('', [Validators.minLength(3)]);
  anoPublicacao = new FormControl('', [Validators.minLength(3)]);

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
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe({
      next: () => {
        this.router.navigate([`assuntos/${this.id_cat}/livros`]);
        this.service.mensagem('Livro criado com sucesso!');
      },
      error: (erro) => {
        this.router.navigate([`assuntos/${this.id_cat}/livros`]);
        this.service.mensagem('Erro ao criar novo livro, tente mais tarde!');
        console.log(erro);
      },
    });
  }

  cancel(): void {
    this.router.navigate([`assuntos/${this.id_cat}/livros`]);
  }

  getMessage() {
    if (this.titulo.invalid) {
      return 'O campo titulo deve conter entre 3 e 40 caracteres.';
    }
    if (this.editora.invalid) {
      return 'O campo editora deve conter entre 3 e 40 caracteres.';
    }
    if (this.edicao.invalid) {
      return 'O campo edição deve ser informado';
    }
    return false;
  }
}
