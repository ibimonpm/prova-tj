import { Component, OnInit, ElementRef  } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
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
  id_ass: Number = 0;

  livro: Livro = {
    codI: 0,
    titulo: '',
    editora: '',
    edicao: 0,
    anoPublicacao: 0,
    mediaPrecoStr: "",
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
    this.id_ass = Number.parseInt(this.route.snapshot.paramMap.get('id_ass')!);
  }

  create(): void {
    this.service.createLivroDireto(this.livro).subscribe({
      next: () => {
        this.router.navigate([`livros`]);
        this.service.mensagem('Livro criado com sucesso!');
      },
      error: (erro) => {
        this.router.navigate([`livros`]);
        this.service.mensagem('Erro ao criar novo livro, tente mais tarde!');
        console.log(erro);
      },
    });
  }

  cancel(): void {
    this.router.navigate([`livros`]);
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
