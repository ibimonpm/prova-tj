import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Assunto } from '../assunto.model';
import { AssuntoService } from '../assunto.service';

@Component({
  selector: 'app-assunto-create',
  templateUrl: './assunto-create.component.html',
  styleUrls: ['./assunto-create.component.css']
})
export class AssuntoCreateComponent {

  assunto: Assunto = {
    nome:'',
    descricao:''
  }
  constructor(private service: AssuntoService, private router: Router){}

  ngOnInit():void{
  }

  create(): void{
    this.service.create(this.assunto).subscribe(
      (resposta) => {
        this.router.navigate(['assuntos']);
        this.service.mensagem('Assuntos criada com sucesso!');
      },
      err => {
        for(let i = 0 ; i < err.error.erros.length; i++){
          this.service.mensagem(err.error.erros[i].message)
        }
      }
    )
  }

  cancel():void{
    this.router.navigate(['assuntos']);
  }
}
