import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { LivroService } from "../livro.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
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
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(
      {
        next:() =>{
          this.router.navigate([`assuntos/${this.id_cat}/livros`]);
          this.service.mensagem("Livro criado com sucesso!");
        },
        error: (erro) => {
          this.router.navigate([`assuntos/${this.id_cat}/livros`]);
          this.service.mensagem("Erro ao criar novo livro, tente mais tarde!");
          console.log(erro);
        }
      }
    );
  }

  cancel(): void{
    this.router.navigate([`assuntos/${this.id_cat}/livros`]);
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
