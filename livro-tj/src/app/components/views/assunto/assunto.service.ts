import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assunto } from './assunto.model';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  baseUrl: String = environment.baseUrl;

  constructor(private htt: HttpClient, private _snack: MatSnackBar) {}

   findAll():Observable<Assunto[]> {
      const url =  `${this.baseUrl}/assuntos`
      return this.htt.get<Assunto[]>(url);
   }

   findById(id: Number): Observable<Assunto>{
      const url =  `${this.baseUrl}/assuntos/${id}`
      return this.htt.get<Assunto>(url);
   }

   create(Assunto:Assunto):Observable<Assunto>{
      const url =  `${this.baseUrl}/assuntos`
      return this.htt.post<Assunto>(url, Assunto);
   }

   delete(id: Number): Observable<void>{
      const url =  `${this.baseUrl}/assuntos/${id}`
      return this.htt.delete<void>(url);
   }

   update(Assunto : Assunto): Observable<void>{
      const url =  `${this.baseUrl}/assuntos/${Assunto.id}`
      return this.htt.put<void>(url,Assunto);
   }

   mensagem(str:String): void{
      this._snack.open(`${str}`,`OK`,{
         horizontalPosition: 'end',
         verticalPosition: 'top',
         duration: 4000
      })
   }
}
