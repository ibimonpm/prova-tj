import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Assunto } from "../assunto.model";
import { AssuntoService } from "../assunto.service";

@Component({
  selector: "app-assunto-delete",
  templateUrl: "./assunto-delete.component.html",
  styleUrls: ["./assunto-delete.component.css"],
})
export class AssuntoDeleteComponent implements OnInit {
  assunto: Assunto = {
    id: "",
    nome: "",
    descricao: "",
  };

  constructor(
    private service: AssuntoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assunto.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.assunto.id!).subscribe((resposta) => {
      this.assunto = resposta;
      console.log(this.assunto);
    });
  }

  delete(): void{
   this.service.delete(this.assunto.id!).subscribe((resposta) =>{
      this.router.navigate(['assuntos']);
      this.service.mensagem('Assunto deletado com sucesso!');
   },
   err =>{
      this.service.mensagem(err.error.message)
   }
   );
 }

 cancel(): void{
  this.router.navigate(['assuntos']);
 }
}
