import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Assunto } from '../assunto.model';
import { AssuntoService } from '../assunto.service';

@Component({
  selector: 'app-assunto-read',
  templateUrl: './assunto-read.component.html',
  styleUrls: ['./assunto-read.component.css']
})
export class AssuntoReadComponent{
  assunto: Assunto[] = []
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros','acoes'];

  constructor(private service: AssuntoService, private router: Router){}

  ngOnInit():void{
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      console.log(resposta);
      this.assunto = resposta;
    })
  }

  navegarParaAssuntoCreate(){
    this.router.navigate(["assuntos/create"])
  }

  navegarParaAutorCreate(){
    this.router.navigate(["autor/create"])
  }
}
