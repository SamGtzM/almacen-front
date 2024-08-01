import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { sistemasI } from '../../models/sistemas.interface';
import { ResponseI } from '../../models/response.interface';
import { SistemasService } from '../../services/sistemas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sistemas',
  standalone: true,
  imports: [],
  templateUrl: './sistemas.component.html',
  styleUrl: './sistemas.component.scss'
})
export class SistemasComponent implements OnInit {

  public estado: Array<sistemasI> = [];

  singupForm = new FormGroup({
    nombre_sistema:     new FormControl('', Validators.required),
    version_sistema:    new FormControl('', Validators.required),
  });

  getsistemasIdForm = new FormGroup({
    id_sistema:         new FormControl('', Validators.required),
    nombre_sistema:     new FormControl('', Validators.required),
    version_sistema:    new FormControl('', Validators.required),
    fecha_alta:         new FormControl('')
  })

  //Cabeceras tabla
  displayedColumns: string[] = [
    'ID',
    'Tipo Acceso',
    'Fecha alta'
  ];
  dataSource!:MatTableDataSource<sistemasI>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private SistemasService: SistemasService,
  ) { }

  ngOnInit(): void {
    this.getSistemas();
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

  //Llenando tabla
  getSistemas(){
    this.SistemasService.getSistemas().subscribe( (res:any) =>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.estado = res;
    });
  }

  //Altas
  singupSistemas(sistema: sistemasI){
    this.SistemasService.singupSistemas(sistema).subscribe( (res:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Guardado!',
        text: 'Registrado correctamente!',
      });
      this.getSistemas();
    });
  }

  //Llenar modal por id
  getSistemasById(id_sistema: sistemasI){
    this.SistemasService.getSistemasById(id_sistema).subscribe( (res:any) =>{
      this.getsistemasIdForm = new FormGroup({
        id_sistema:         new FormControl(res[0].fecha_alta, Validators.required),
        nombre_sistema:     new FormControl(res[0].fecha_alta, Validators.required),
        version_sistema:    new FormControl(res[0].fecha_alta, Validators.required),
        fecha_alta:         new FormControl(res[0].fecha_alta, Validators.required)
      });
    });
  }

  //Actualizar registro
  putSistemas(sistemas: sistemasI){
    this.SistemasService.putSistemas(sistemas).subscribe( (res:ResponseI) =>{
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Cuenta Actualizada!',
      });
      this.getSistemas();
    })
  }

  //Borrar registros de la tabla
  deleteSistemasById(id_sistema: sistemasI){
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
          this.SistemasService.deleteSistemasById(id_sistema).subscribe( (res:ResponseI) =>{
          this.getSistemas();
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
