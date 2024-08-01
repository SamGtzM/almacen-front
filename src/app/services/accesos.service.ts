import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { accesosI } from '../models/accesos.interface';
import { Observable } from 'rxjs';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AccesosService {
  singup(Accesos: accesosI) {
    throw new Error('Method not implemented.');
  }

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getAccesos(){
    return this.http.get<accesosI>(`${this.url}/accesos/`);
  }

  singupAccesos(Accesos: accesosI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/accesos/`, Accesos);
  }

  putAccesos(cuenta: accesosI):Observable<ResponseI>{
    return this.http.put<ResponseI>(`${this.url}/accesos/`+cuenta.id_acceso, cuenta);
  }

  getAccesosById(id_acceso: accesosI):Observable<accesosI>{
    return this.http.get<accesosI>(`${this.url}/accesos/`+ id_acceso);
  }

  deleteAccesosById(id_acceso: accesosI):Observable<ResponseI>{
    return this.http.delete<ResponseI>(`${this.url}/accesos/`+ id_acceso);
  }
}
