import { Component } from '@angular/core';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-autor-update',
  templateUrl: './autor-update.component.html',
  styleUrls: ['./autor-update.component.css']
})
export class AutorUpdateComponent {
  autor: Autor = {
    id: 0,
    nome: "",
  };

  constructor(
    private service: AutorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.autor.id = Number.parseInt(this.route.snapshot.paramMap.get("id")!);
    this.findById();
  }

  findById(): void {
    this.service.findById(this.autor.id!).subscribe((resposta) => {
      this.autor.id = resposta.id;
      this.autor.nome = resposta.nome;
    });
  }

  update(): void {
    this.service.update(this.autor).subscribe(
      (resposta) => {
        this.router.navigate(["autores"]);
        this.service.mensagem("Autor atualizado com sucesso!");
      },
      (err) => {
       this.service.mensagem("Validar se todos os campos estão preenchidos corretamente.")
      }
    );
  }

  cancel():void{
    this.router.navigate([('autores')]);
  }
}
