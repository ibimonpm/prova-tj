import { Component, OnInit } from "@angular/core";
import { LivroService } from "../livro.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent {
  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: "",
  };

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

  delete(): void{
    this.service.delete(this.livro.id!).subscribe(() =>{
       this.router.navigate(['assuntos']);
       this.service.mensagem('Livro deletado com sucesso!');
    },
    err =>{
       this.service.mensagem(err.error.message)
    }
    );
  }

  cancel(): void {
    this.router.navigate([`assuntos/${this.id_cat}/livros`]);
  }


  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro.id = resposta.id;
      this.livro.titulo = resposta.titulo;
      this.livro.nomeAutor = resposta.nomeAutor;
      this.livro.texto = resposta.texto;
    });
  }
}
