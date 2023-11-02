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
  id_ass: Number = 0;

  livro: Livro = {
    codI: 0,
    titulo: "",
    editora: "",
    edicao: 0,
    anoPublicacao:0,
    mediaPrecoStr:"",
    autores:[{id:0, nome:''}],
    assunto:{id:0, descricao:""}
  };

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_ass = Number.parseInt(this.route.snapshot.paramMap.get("id_ass")!);
    this.livro.codI = Number.parseInt(this.route.snapshot.paramMap.get("codI")!);
    this.findById();
  }

  delete(): void{
    this.service.delete(this.livro.codI!).subscribe(() =>{
       this.router.navigate(['assuntos']);
       this.service.mensagem('Livro deletado com sucesso!');
    },
    err =>{
       this.service.mensagem(err.error.message)
    }
    );
  }

  cancel(): void {
    this.router.navigate([`livros`]);
  }


  findById(): void {
    this.service.findById(this.livro.codI!).subscribe((resposta) => {
      this.livro.codI = resposta.codI;
      this.livro.titulo = resposta.titulo;
      this.livro.editora = resposta.editora;
      this.livro.edicao = resposta.edicao;
      this.livro.anoPublicacao = resposta.anoPublicacao;
      this.livro.mediaPrecoStr = resposta.mediaPrecoStr;
    });
  }
}
