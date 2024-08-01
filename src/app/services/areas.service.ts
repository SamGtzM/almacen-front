import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { areasI } from '../models/areas.interface';
import { Observable } from 'rxjs';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getAreas(){
    return this.http.get<areasI>(`${this.url}/areas/`);
  }

  singupAreas(Areas: areasI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/areas/`, Areas);
  }

  putAreas(Areas: areasI):Observable<ResponseI>{
    return this.http.put<ResponseI>(`${this.url}/areas/`+Areas.id_area, Areas);
  }

  getAreasById(id_acceso: areasI):Observable<areasI>{
    return this.http.get<areasI>(`${this.url}/areas/`+ id_acceso);
  }

  deleteAreasById(id_acceso: areasI):Observable<ResponseI>{
    return this.http.delete<ResponseI>(`${this.url}/areas/`+ id_acceso);
  }
}
