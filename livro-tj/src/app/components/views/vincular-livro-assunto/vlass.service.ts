import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Vlass } from "./vlass.model";

@Injectable({
  providedIn: "root",
})
export class VlassService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  vincular(vlass: Vlass): Observable<void> {
    const url = `${this.baseUrl}/livros/${vlass.codI}`;
    return this.http.put<void>(url, vlass);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, `OK`, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
