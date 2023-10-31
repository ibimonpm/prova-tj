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

  findAllByAssunto(id_cat: String): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?assunto=${id_cat}`;
    return this.http.get<Livro[]>(url);
  }

  findById(id: String): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${id}`;
    return this.http.get<Livro>(url);
  }

  create(livro: Livro, id_cat: String): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${id_cat}`;
    return this.http.post<Livro>(url, livro);
  }

  update(livro: Livro): Observable<void> {
    const url = `${this.baseUrl}/livros/${livro.id}`;
    return this.http.put<void>(url, livro);
  }

  delete(id: String): Observable<void> {
    const url = `${this.baseUrl}/livros/${id}`;
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
