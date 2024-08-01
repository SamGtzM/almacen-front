import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { usuariosI } from '../../models/usuarios.interface';
import { ResponseI } from '../../models/response.interface';
import { AdminUsuarioService } from '../../services/admin-usuario.service';
import { NavigationService } from '../../services/navigation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  public estado: Array<usuariosI> = [];

  singupForm = new FormGroup({
    id_usuario: new FormControl('', Validators.required),
    id_acceso: new FormControl('', Validators.required),
    id_area: new FormControl('', Validators.required),
    nombre_usuario: new FormControl('', Validators.required),
    numero_empleado: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
    usuario_alta: new FormControl('', Validators.required),
    activo: new FormControl('', Validators.required)
  });

  getusuariosIdForm = new FormGroup({
    id_usuario: new FormControl('', Validators.required),
    nombre_usuario: new FormControl('', Validators.required),
    numero_empleado: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required), 
    pass: new FormControl('', Validators.required),
    usuario_alta: new FormControl('', Validators.required),
    fecha_alta: new FormControl('')
  })

  //Cabeceras tabla
  displayedColumns: string[] = [
    'ID',
    'nombre_usuario',
    'numero_empleado',
    'correo',
    'telefono',
    'usuario' ,
    'pass',
    'usuario_alta',
    'fecha_alta'
  ];
  dataSource!:MatTableDataSource<usuariosI>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private AdminUsuarioService: AdminUsuarioService,
    private NavigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

  //Llenando tabla
  getUsuarios(){
    this.AdminUsuarioService.getUsuarios().subscribe( (res:any) =>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.estado = res;
    });
  }

  //Llenar info usuario actual
  info(){
    this.estado = this.NavigationService.info();
    const usuario = new String;
    this.singupForm = new FormGroup({
      id_usuario: new FormControl('', Validators.required),
      id_acceso: new FormControl('', Validators.required),
      id_area: new FormControl('', Validators.required),
      nombre_usuario: new FormControl('', Validators.required),
      numero_empleado: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      usuario_alta: new FormControl(usuario[0], Validators.required),
      activo: new FormControl('', Validators.required)
    });
  }

  //Altas
  singupUsuarios(usuarios: usuariosI){
    this.AdminUsuarioService.singupUsuarios(usuarios).subscribe( (res:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Guardado!',
        text: 'Registrado correctamente!',
      });
      this.getUsuarios();
    });
  }

  //Llenar modal por id
  getUsuariosById(id_usuario: usuariosI){
    this.AdminUsuarioService.getUsuariosById(id_usuario).subscribe( (res:any) =>{
      this.getusuariosIdForm = new FormGroup({
        id_usuario: new FormControl(res[0].id_acceso, Validators.required),
        nombre_usuario: new FormControl(res[0].id_acceso, Validators.required),
        numero_empleado: new FormControl(res[0].id_acceso, Validators.required),
        correo: new FormControl(res[0].id_acceso, Validators.required),
        telefono: new FormControl(res[0].id_acceso, Validators.required),
        usuario: new FormControl(res[0].id_acceso, Validators.required), 
        pass: new FormControl(res[0].id_acceso, Validators.required),
        usuario_alta: new FormControl(res[0].id_acceso, Validators.required),
        fecha_alta: new FormControl(res[0].id_acceso, Validators.required)
      });
    });
  }

  //Actualizar registro
  putUsuarios(usuarios: usuariosI){
    this.AdminUsuarioService.putUsuarios(usuarios).subscribe( (res:ResponseI) =>{
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Cuenta Actualizada!',
      });
      this.getUsuarios();
    })
  }

  //Borrar registros de la tabla
  deleteUsuariosById(id_usuario: usuariosI){
    Swal.fire({
      title: 'Estas de acuerdo?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.AdminUsuarioService.deleteUsuariosById(id_usuario).subscribe( (res:ResponseI) =>{
          this.getUsuarios();
        });
        Swal.fire(
          'Eliminado!',
          'El registro fue eliminado con exito.',
          'success'
        )
      }
    });
  }

}
