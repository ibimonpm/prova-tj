import { Component } from '@angular/core';
import { Autor } from '../autor.model';
import { AutorService } from '../autor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-autor-delete',
  templateUrl: './autor-delete.component.html',
  styleUrls: ['./autor-delete.component.css']
})

export class AutorDeleteComponent {
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
      this.autor = resposta;
      console.log(this.autor);
    });
  }

  delete(): void{
   this.service.delete(this.autor.id!).subscribe((resposta) =>{
      this.router.navigate(['autores']);
      this.service.mensagem('Autor deletado com sucesso!');
   },
   err =>{
      this.service.mensagem(err.error.message)
   }
   );
 }

 cancel(): void{
  this.router.navigate(['autores']);
 }
}
