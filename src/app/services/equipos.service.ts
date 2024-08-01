import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { equiposI } from '../models/equipos.interface';
import { Observable } from 'rxjs';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getEquipos(){
    return this.http.get<equiposI>(`${this.url}/equipos/`);
  }

  singupEquipos(Equipos: equiposI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/equipos/`, Equipos);
  }

  putEquipos(Equipos: equiposI):Observable<ResponseI>{
    return this.http.put<ResponseI>(`${this.url}/equipos/`+Equipos.id_equipo, Equipos);
  }

  getEquiposById(id_equipo: equiposI):Observable<equiposI>{
    return this.http.get<equiposI>(`${this.url}/equipos/`+ id_equipo);
  }

  deleteEquiposById(id_equipo: equiposI):Observable<ResponseI>{
    return this.http.delete<ResponseI>(`${this.url}/equipos/`+ id_equipo);
  }
}
