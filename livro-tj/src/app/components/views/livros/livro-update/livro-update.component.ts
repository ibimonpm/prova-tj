import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { LivroService } from "../livro.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";

@Component({
  selector: "app-livro-update",
  templateUrl: "./livro-update.component.html",
  styleUrls: ["./livro-update.component.css"],
})
export class LivroUpdateComponent {
  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: "",
  };

  titulo = new FormControl("", [Validators.minLength(3)]);
  nomeAutor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro.id = resposta.id;
      this.livro.titulo = resposta.titulo;
      this.livro.nomeAutor = resposta.nomeAutor;
      this.livro.texto = resposta.texto;
    });
  }

  cancel(): void {
    this.router.navigate([`assuntos/${this.id_cat}/livros`]);
  }

  update(): void {
    this.service.update(this.livro).subscribe({
      next: () => {
        this.router.navigate([`assuntos/${this.id_cat}/livros`]);
        this.service.mensagem("Livro alterado com sucesso!");
      },
      error: (erro) => {
        this.router.navigate([`assuntos/${this.id_cat}/livros`]);
        this.service.mensagem("Erro ao altera novo livro, tente mais tarde!");
        console.log(erro);
      },
    });
  }

  getMessage() {
    if (this.titulo.invalid) {
      return "O campo titulo deve conter entre 3 e 100 caracteres.";
    }
    if (this.nomeAutor.invalid) {
      return "O campo nome do autor deve conter entre 3 e 100 caracteres.";
    }
    if (this.texto.invalid) {
      return "O campo texto deve conter entre 10 e 2000000 caracteres.";
    }
    return false;
  }
}
