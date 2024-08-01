import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { consultarhI } from '../models/consultarh.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasrhService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getEquipos(){
    return this.http.get<consultarhI>(`${this.url}/equipos/`);
  }

  getEquiposById(id_equipo: consultarhI):Observable<consultarhI>{
    return this.http.get<consultarhI>(`${this.url}/equipos/`+ id_equipo);
  }

  getEquiposRHById(numeroempleado: consultarhI):Observable<consultarhI>{
    return this.http.get<consultarhI>(`${this.url}/equipos/`+ numeroempleado);
  }
}
