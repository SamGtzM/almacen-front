import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { accesosI } from '../../models/accesos.interface';
import { ResponseI } from '../../models/response.interface';
import { AccesosService } from '../../services/accesos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accesos',
  standalone: true,
  imports: [],
  templateUrl: './accesos.component.html',
  styleUrl: './accesos.component.scss'
})
export class AccesosComponent implements OnInit {

  public estado: Array<accesosI> = [];

  singupForm = new FormGroup({
    id_acceso: new FormControl('', Validators.required),
    tipo_acceso: new FormControl('', Validators.required)
  });

  getaccesosIdForm = new FormGroup({
    id_acceso: new FormControl('', Validators.required),
    tipo_acceso: new FormControl('', Validators.required),
    fecha_alta: new FormControl('')
  })

  //Cabeceras tabla
  displayedColumns: string[] = [
    'ID',
    'Tipo Acceso',
    'Fecha alta'
  ];
  dataSource!:MatTableDataSource<accesosI>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private AccesosService: AccesosService,
  ) { }

  ngOnInit(): void {
    this.getAccesos();
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

  //Llenando tabla
  getAccesos(){
    this.AccesosService.getAccesos().subscribe( (res:any) =>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.estado = res;
    });
  }

  //Altas
  singupAccesos(Accesos: accesosI){
    this.AccesosService.singupAccesos(Accesos).subscribe( (res:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Guardado!',
        text: 'Registrado correctamente!',
      });
      this.getAccesos();
    });
  }

  //Llenar modal por id
  getAccesosById(id_acceso: accesosI){
    this.AccesosService.getAccesosById(id_acceso).subscribe( (res:any) =>{
      this.getaccesosIdForm = new FormGroup({
        id_acceso: new FormControl(res[0].id_acceso, Validators.required),
        tipo_acceso: new FormControl(res[0].tipo_acceso, Validators.required),
        fecha_alta: new FormControl(res[0].fecha_alta, Validators.required)
      });
    });
  }

  //Actualizar registro
  putAccesos(accesos: accesosI){
    this.AccesosService.putAccesos(accesos).subscribe( (res:ResponseI) =>{
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Cuenta Actualizada!',
      });
      this.getAccesos();
    })
  }

  //Borrar registros de la tabla
  deleteAccesosById(id_acceso: accesosI){
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
          this.AccesosService.deleteAccesosById(id_acceso).subscribe( (res:ResponseI) =>{
          this.getAccesos();
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
