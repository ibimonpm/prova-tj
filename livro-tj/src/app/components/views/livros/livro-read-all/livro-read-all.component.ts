import { Component, OnInit} from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent {
  displayedColumns: string[] = ['codI', 'titulo', 'livros','acoes'];
  id_assun : String = '';
  livros: Livro[] = [];

  constructor(private service: LivroService,
    private router:Router,
    private route:ActivatedRoute){}

  ngOnInit():void{
    this.id_assun = this.route.snapshot.paramMap.get('id_assunto')!;
    this.findAll();
  }

  findAll(): void{
    this.service.findAllByAssunto(this.id_assun).subscribe((resposta) =>{
      this.livros = resposta;
      console.log(this.livros);
    });
  }


  navegarParaCriarLivro():void{
    this.router.navigate([`assuntos/${this.id_assun}/livros/create`]);
  }
}
