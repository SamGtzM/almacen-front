import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { sistemasI } from '../models/sistemas.interface';
import { Observable } from 'rxjs';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class SistemasService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getSistemas(){
    return this.http.get<sistemasI>(`${this.url}/sistemas/`);
  }

  singupSistemas(sistemas: sistemasI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/sistemas/`, sistemas);
  }

  putSistemas(sistemas: sistemasI):Observable<ResponseI>{
    return this.http.put<ResponseI>(`${this.url}/sistemas/`+sistemas.id_sistema, sistemas);
  }

  getSistemasById(id_sistema: sistemasI):Observable<sistemasI>{
    return this.http.get<sistemasI>(`${this.url}/sistemas/`+ id_sistema);
  }

  deleteSistemasById(id_sistema: sistemasI):Observable<ResponseI>{
    return this.http.delete<ResponseI>(`${this.url}/sistemas/`+ id_sistema);
  }
}
