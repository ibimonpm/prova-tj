import { Component } from '@angular/core';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autor-read-all',
  templateUrl: './autor-read-all.component.html',
  styleUrls: ['./autor-read-all.component.css']
})
export class AutorReadAllComponent {
  displayedColumns: string[] = ['id', 'nome','acoes'];
  autores: Autor[] = [];

  constructor(private service: AutorService, private router: Router){}

  ngOnInit():void{
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      console.log(resposta);
      this.autores = resposta;
    })
  }

  navegarParaAutorCreate(){
    this.router.navigate(["autores/create"])
  }
}
