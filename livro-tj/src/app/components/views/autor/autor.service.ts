import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { Autor } from "./autor.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  findAllByLivro(id_livro: String): Observable<Autor[]> {
    const url = `${this.baseUrl}/autor?livro=${id_livro}`;
    return this.http.get<Autor[]>(url);
  }

  findById(id: String): Observable<Autor> {
    const url = `${this.baseUrl}/autor/${id}`;
    return this.http.get<Autor>(url);
  }

  create(autor: Autor, id_livro: String): Observable<Autor> {
    const url = `${this.baseUrl}/autor/${id_livro}`;
    return this.http.post<Autor>(url, autor);
  }

  update(autor: Autor): Observable<void> {
    const url = `${this.baseUrl}/autor/${autor.codAu}`;
    return this.http.put<void>(url, autor);
  }

  delete(codAu: String): Observable<void> {
    const url = `${this.baseUrl}/autor/${codAu}`;
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
