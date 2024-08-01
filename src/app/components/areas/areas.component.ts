import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { areasI } from '../../models/areas.interface';
import { ResponseI } from '../../models/response.interface';
import { AreasService } from '../../services/areas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.scss'
})
export class AreasComponent implements OnInit {

  public estado: Array<areasI> = [];

  singupForm = new FormGroup({
    nombre_area: new FormControl('', Validators.required)
  });

  getareasIdForm = new FormGroup({
    id_area: new FormControl('', Validators.required),
    nombre_area: new FormControl('', Validators.required),
    fecha_alta: new FormControl('')
  })

  //Cabeceras tabla
  displayedColumns: string[] = [
    'ID',
    'Nombre Area',
    'Fecha alta'
  ];
  dataSource!:MatTableDataSource<areasI>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private AreasService: AreasService,
  ) { }

  ngOnInit(): void {
    this.getAreas();
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

  //Llenando tabla
  getAreas(){
    this.AreasService.getAreas().subscribe( (res:any) =>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.estado = res;
    });
  }

  //Altas
  singupAreas(Areas: areasI){
    this.AreasService.singupAreas(Areas).subscribe( (res:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Guardado!',
        text: 'Registrado correctamente!',
      });
      this.getAreas();
    });
  }

  //Llenar modal por id
  getAreasById(id_area: areasI){
    this.AreasService.getAreasById(id_area).subscribe( (res:any) =>{
      this.getareasIdForm = new FormGroup({
        id_area: new FormControl(res[0].id_area, Validators.required),
        nombre_area: new FormControl(res[0].nombre_area, Validators.required),
        fecha_alta: new FormControl(res[0].fecha_alta, Validators.required),
      });
    });
  }

  //Actualizar registro
  putAreas(areas: areasI){
    this.AreasService.putAreas(areas).subscribe( (res:ResponseI) =>{
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Cuenta Actualizada!',
      });
      this.getAreas();
    })
  }

  //Borrar registros de la tabla
  deleteAreasById(id_area: areasI){
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
          this.AreasService.deleteAreasById(id_area).subscribe( (res:ResponseI) =>{
          this.getAreas();
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
