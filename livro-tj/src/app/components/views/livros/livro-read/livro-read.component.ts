import { Component, OnInit } from "@angular/core";
import { LivroService } from "../livro.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit{
  id_ass: Number = 0;

  livro: Livro = {
    codI: 0,
    titulo: "",
    editora: "",
    edicao: 0,
    anoPublicacao:0,
    valorMedioVenda:0
  };

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_ass =  Number.parseInt(this.route.snapshot.paramMap.get("id_ass")!);
    this.livro.codI = Number.parseInt(this.route.snapshot.paramMap.get("codI")!);
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.codI!).subscribe((resposta) => {
      this.livro.codI = resposta.codI;
      this.livro.titulo = resposta.titulo;
      this.livro.editora = resposta.editora;
      this.livro.edicao = resposta.edicao;
      this.livro.anoPublicacao = resposta.anoPublicacao;
      this.livro.valorMedioVenda = resposta.valorMedioVenda;
    });
  }

  cancel(): void {
    this.router.navigate([`assuntos/${this.id_ass}/livros`]);
  }
}
