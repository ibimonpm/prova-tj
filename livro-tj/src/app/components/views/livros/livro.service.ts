import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Livro } from "./livro.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class LivroService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  findAllByAssunto(id_assunto: String): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?assunto=${id_assunto}`;
    return this.http.get<Livro[]>(url);
  }

  findById(codI: String): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${codI}`;
    return this.http.get<Livro>(url);
  }

  create(livro: Livro, id_assunto: String): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${id_assunto}`;
    return this.http.post<Livro>(url, livro);
  }

  update(livro: Livro): Observable<void> {
    const url = `${this.baseUrl}/livros/${livro.codI}`;
    return this.http.put<void>(url, livro);
  }

  delete(codI: String): Observable<void> {
    const url = `${this.baseUrl}/livros/${codI}`;
    return this.http.delete<void>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, `OK`, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
