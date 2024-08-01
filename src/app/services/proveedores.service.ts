import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { proveedoresI } from '../models/proveedores.interface';
import { Observable } from 'rxjs';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getProveedores(){
    return this.http.get<proveedoresI>(`${this.url}/proveedores/`);
  }

  singupProveedores(Proveedores: proveedoresI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/proveedores/`, Proveedores);
  }

  putProveedores(Proveedores: proveedoresI):Observable<ResponseI>{
    return this.http.put<ResponseI>(`${this.url}/proveedores/`+Proveedores.id_provedor, Proveedores);
  }

  getProveedoresById(id_provedor: proveedoresI):Observable<proveedoresI>{
    return this.http.get<proveedoresI>(`${this.url}/proveedores/`+ id_provedor);
  }

  deleteProveedoresById(id_provedor: proveedoresI):Observable<ResponseI>{
    return this.http.delete<ResponseI>(`${this.url}/proveedores/`+ id_provedor);
  }
}