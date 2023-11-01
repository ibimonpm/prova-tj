import { Component } from '@angular/core';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-autor-create',
  templateUrl: './autor-create.component.html',
  styleUrls: ['./autor-create.component.css']
})
export class AutorCreateComponent {
  autor: Autor = {
    id: 0,
    nome:''
  }

  autores = new FormControl('', [Validators.minLength(3)]);

  constructor(private service: AutorService, private router: Router){}

  ngOnInit():void{
  }
  create(): void{
    this.service.create(this.autor).subscribe(
      (resposta) => {
        this.router.navigate(['autores']);
        this.service.mensagem('Autor criado com sucesso!');
      },
      err => {
        for(let i = 0 ; i < err.error.erros.length; i++){
          this.service.mensagem(err.error.erros[i].message)
        }
      }
    )
  }

  cancel():void{
    this.router.navigate(['autores']);
  }

  getMessage() {
    if (this.autores.invalid) {
      return 'O campo titulo deve conter entre 3 e 40 caracteres.';
    }
    if (this.autores.invalid) {
      return 'O campo editora deve conter entre 3 e 40 caracteres.';
    }

    return false;
  }

}
