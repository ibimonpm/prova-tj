import { Component, OnInit } from "@angular/core";
import { Assunto } from "../assunto.model";
import { AssuntoService } from "../assunto.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-assunto-update",
  templateUrl: "./assunto-update.component.html",
  styleUrls: ["./assunto-update.component.css"],
})
export class AssuntoUpdateComponent {
  assunto: Assunto = {
    id: 0,
    descricao: "",
  };

  constructor(
    private service: AssuntoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assunto.id = Number.parseInt(this.route.snapshot.paramMap.get("id")!);
    this.findById();
  }

  findById(): void {
    this.service.findById(this.assunto.id!).subscribe((resposta) => {
      this.assunto.id = resposta.id;
      this.assunto.descricao = resposta.descricao;
    });
  }

  update(): void {
    this.service.update(this.assunto).subscribe(
      (resposta) => {
        this.router.navigate(["assuntos"]);
        this.service.mensagem("Assunto atualizado com sucesso!");
      },
      (err) => {
       this.service.mensagem("Validar se todos os campos estão preenchidos corretamente.")
      }
    );
  }

  cancel():void{
    this.router.navigate([('assuntos')]);
  }
}
