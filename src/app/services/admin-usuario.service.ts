import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { usuariosI } from '../models/usuarios.interface';
import { Observable } from 'rxjs';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuarioService {

  private url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getUsuarios(){
    return this.http.get<usuariosI>(`${this.url}/auth/`);
  }

  singupUsuarios(usuarios: usuariosI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/auth/singup`, usuarios);
  }

  putUsuarios(usuarios: usuariosI):Observable<ResponseI>{
    return this.http.put<ResponseI>(`${this.url}/auth/`+usuarios.id_usuario, usuarios);
  }

  getUsuariosById(id_usuario: usuariosI):Observable<usuariosI>{
    return this.http.get<usuariosI>(`${this.url}/auth/`+ id_usuario);
  }

  deleteUsuariosById(id_usuario: usuariosI):Observable<ResponseI>{
    return this.http.delete<ResponseI>(`${this.url}/auth/`+ id_usuario);
  }
}
