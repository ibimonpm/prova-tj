import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Vla } from "./vla.model";

@Injectable({
  providedIn: "root",
})
export class VlaService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  vincular(vla: Vla): Observable<void> {
    const url = `${this.baseUrl}/livros/${vla.codI}`;
    return this.http.put<void>(url, vla);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, `OK`, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
