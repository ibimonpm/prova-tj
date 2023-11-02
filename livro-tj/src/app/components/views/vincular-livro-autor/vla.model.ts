import { Autor } from '../autor/autor.model';
import { Livro } from '../livros/livro.model';

export class Vla {
  codI?: Number;
  titulo: String = '';
  editora: String = '';
  edicao: Number = 0;
  anoPublicacao: Number = 0;
  mediaPrecoStr: String = '';
  autores : any[] = [{id:  0}];
}
