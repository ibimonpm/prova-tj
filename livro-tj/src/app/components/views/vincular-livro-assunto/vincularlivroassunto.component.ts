import { Component } from '@angular/core';
import { Assunto } from '../assunto/assunto.model';
import { Livro } from '../livros/livro.model';
import { LivroService } from '../livros/livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from '../autor/autor.service';
import { Autor } from '../autor/autor.model';

@Component({
  selector: 'app-vincularlivroassunto',
  templateUrl: './vincularlivroassunto.component.html',
  styleUrls: ['./vincularlivroassunto.component.css']
})
export class VincularlivroassuntoComponent {
 
}
