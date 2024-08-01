import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { consultarhI } from '../../models/consultarh.interface';
import { ResponseI } from '../../models/response.interface';
import { ConsultasrhService } from '../../services/consultasrh.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-consultarh',
  standalone: true,
  imports: [],
  templateUrl: './consultarh.component.html',
  styleUrl: './consultarh.component.scss'
})
export class ConsultarhComponent implements OnInit  {

  public estado: Array<consultarhI> = [];

  getconsultarhIdForm = new FormGroup({
    id_equipo: new FormControl('', Validators.required),
    gama: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    numero_empleado_asignado: new FormControl('', Validators.required),
    fecha_asignacion: new FormControl('', Validators.required),
    estatus_asignado: new FormControl('', Validators.required)
  })

  //Cabeceras tabla
  displayedColumns: string[] = [
    'ID',
    'Gama',
    'Modelo',
    '# Empleado Asignado',
    'Fecha Asignación',
    'Estatus'
  ];
  dataSource!:MatTableDataSource<consultarhI>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private ConsultasrhService: ConsultasrhService,
  ) { }

  ngOnInit(): void {
    this.getConsultarh();
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

  //Llenando tabla
  getConsultarh(){
    this.ConsultasrhService.getEquipos().subscribe( (res:any) =>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.estado = res;
    });
  }

  //Llenar modal por id
  getConsultarhById(id_equipo: consultarhI){
    this.ConsultasrhService.getEquiposById(id_equipo).subscribe( (res:any) =>{
      this.getconsultarhIdForm = new FormGroup({
        id_equipo: new FormControl(res[0].id_acceso, Validators.required),
        gama: new FormControl(res[0].id_acceso, Validators.required),
        modelo: new FormControl(res[0].id_acceso, Validators.required),
        numero_empleado_asignado: new FormControl(res[0].id_acceso, Validators.required),
        fecha_asignacion: new FormControl(res[0].id_acceso, Validators.required),
        estatus_asignado: new FormControl(res[0].id_acceso, Validators.required)
      });
    });
  }

  //Llenar modal por numero_empleado
  getConsultarhnumeroempleadoById(numero_empleado: consultarhI){
    this.ConsultasrhService.getEquiposRHById(numero_empleado).subscribe( (res:any) =>{
      this.getconsultarhIdForm = new FormGroup({
        id_equipo: new FormControl(res[0].id_acceso, Validators.required),
        gama: new FormControl(res[0].id_acceso, Validators.required),
        modelo: new FormControl(res[0].id_acceso, Validators.required),
        numero_empleado_asignado: new FormControl(res[0].id_acceso, Validators.required),
        fecha_asignacion: new FormControl(res[0].id_acceso, Validators.required),
        estatus_asignado: new FormControl(res[0].id_acceso, Validators.required)
      });
    });
  }

  // en caso de que quieran modificar estatus asignado desde RH UPDATE

}
