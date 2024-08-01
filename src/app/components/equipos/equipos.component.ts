import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { equiposI } from '../../models/equipos.interface';
import { ResponseI } from '../../models/response.interface';
import { EquiposService } from '../../services/equipos.service';
import { NavigationService } from '../../services/navigation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.scss'
})
export class EquiposComponent implements OnInit{

  public estado: Array<equiposI> = [];

  singupForm = new FormGroup({
    id_sistema: new FormControl('', Validators.required),
    id_provedor: new FormControl('', Validators.required),
    id_usuario:new FormControl('', Validators.required),
    gama: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    numero_serie: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    factura_contrato: new FormControl('', Validators.required),
    fecha_inicio_arrendamiento: new FormControl('', Validators.required),
    fehca_final_arrendamiento: new FormControl('', Validators.required),
    arrendamiento: new FormControl('', Validators.required),
    garantia: new FormControl('', Validators.required),
    mac_equipo: new FormControl('', Validators.required),
    numero_empleado_asignado: new FormControl('', Validators.required),
    password_equipo: new FormControl('', Validators.required),
    hosname: new FormControl('', Validators.required),
    orden_compra: new FormControl('', Validators.required),
    estatus_equipo: new FormControl('', Validators.required),
    fecha_asignacion: new FormControl('', Validators.required),
    estatus_asignado: new FormControl('', Validators.required),
    folio_factura: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    iva: new FormControl('', Validators.required),
    fecha_factura: new FormControl('', Validators.required),
    activo: new FormControl('', Validators.required)
  });

  getequiposIdForm = new FormGroup({
    id_equipo: new FormControl('', Validators.required),
    id_sistema: new FormControl('', Validators.required),
    id_provedor: new FormControl('', Validators.required),
    id_usuario:new FormControl('', Validators.required),
    gama: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    numero_serie: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    factura_contrato: new FormControl('', Validators.required),
    fecha_inicio_arrendamiento: new FormControl('', Validators.required),
    fehca_final_arrendamiento: new FormControl('', Validators.required),
    arrendamiento: new FormControl('', Validators.required),
    garantia: new FormControl('', Validators.required),
    mac_equipo: new FormControl('', Validators.required),
    numero_empleado_asignado: new FormControl('', Validators.required),
    password_equipo: new FormControl('', Validators.required),
    hosname: new FormControl('', Validators.required),
    orden_compra: new FormControl('', Validators.required),
    estatus_equipo: new FormControl('', Validators.required),
    fecha_asignacion: new FormControl('', Validators.required),
    estatus_asignado: new FormControl('', Validators.required),
    folio_factura: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    iva: new FormControl('', Validators.required),
    fecha_factura: new FormControl('', Validators.required),
    fecha_alta: new FormControl('')
  })

  //Cabeceras tabla
  displayedColumns: string[] = [
    'ID',
    'Tipo Acceso',
    'Fecha alta'
  ];
  dataSource!:MatTableDataSource<equiposI>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private EquiposService: EquiposService,
    private NavigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.getEquipos();
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

  //Llenando tabla
  getEquipos(){
    this.EquiposService.getEquipos().subscribe( (res:any) =>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.estado = res;
    });
  }

  //Llenar info usuario actual
  info(){
    this.estado = this.NavigationService.info();
    const id_usuario = new String;//const id_usuario = new String(this.estado[0]);
    this.singupForm = new FormGroup({
      id_sistema: new FormControl('', Validators.required),
      id_provedor: new FormControl('', Validators.required),
      id_usuario: new FormControl(id_usuario[0], Validators.required),
      gama: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      numero_serie: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      factura_contrato: new FormControl('', Validators.required),
      fecha_inicio_arrendamiento: new FormControl('', Validators.required),
      fehca_final_arrendamiento: new FormControl('', Validators.required),
      arrendamiento: new FormControl('', Validators.required),
      garantia: new FormControl('', Validators.required),
      mac_equipo: new FormControl('', Validators.required),
      numero_empleado_asignado: new FormControl('', Validators.required),
      password_equipo: new FormControl('', Validators.required),
      hosname: new FormControl('', Validators.required),
      orden_compra: new FormControl('', Validators.required),
      estatus_equipo: new FormControl('', Validators.required),
      fecha_asignacion: new FormControl('', Validators.required),
      estatus_asignado: new FormControl('', Validators.required),
      folio_factura: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      iva: new FormControl('', Validators.required),
      fecha_factura: new FormControl('', Validators.required),
      activo: new FormControl('', Validators.required)
    });
  }

  //Altas
  singupEquipos(Equipos: equiposI){
    this.EquiposService.singupEquipos(Equipos).subscribe( (res:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Guardado!',
        text: 'Registrado correctamente!',
      });
      this.getEquipos();
    });
  }

  //Llenar modal por id
  getEquiposById(id_equipo: equiposI){
    this.EquiposService.getEquiposById(id_equipo).subscribe( (res:any) =>{
      this.getequiposIdForm = new FormGroup({
        id_equipo: new FormControl(res[0].fecha_alta, Validators.required),
        id_sistema: new FormControl(res[0].fecha_alta, Validators.required),
        id_provedor: new FormControl(res[0].fecha_alta, Validators.required),
        id_usuario:new FormControl(res[0].fecha_alta, Validators.required),
        gama: new FormControl(res[0].fecha_alta, Validators.required),
        modelo: new FormControl(res[0].fecha_alta, Validators.required),
        numero_serie: new FormControl(res[0].fecha_alta, Validators.required),
        cantidad: new FormControl(res[0].fecha_alta, Validators.required),
        factura_contrato: new FormControl(res[0].fecha_alta, Validators.required),
        fecha_inicio_arrendamiento: new FormControl(res[0].fecha_alta, Validators.required),
        fehca_final_arrendamiento: new FormControl(res[0].fecha_alta, Validators.required),
        arrendamiento: new FormControl(res[0].fecha_alta, Validators.required),
        garantia: new FormControl(res[0].fecha_alta, Validators.required),
        mac_equipo: new FormControl(res[0].fecha_alta, Validators.required),
        numero_empleado_asignado: new FormControl(res[0].fecha_alta, Validators.required),
        password_equipo: new FormControl(res[0].fecha_alta, Validators.required),
        hosname: new FormControl(res[0].fecha_alta, Validators.required),
        orden_compra: new FormControl(res[0].fecha_alta, Validators.required),
        estatus_equipo: new FormControl(res[0].fecha_alta, Validators.required),
        fecha_asignacion: new FormControl(res[0].fecha_alta, Validators.required),
        estatus_asignado: new FormControl(res[0].fecha_alta, Validators.required),
        folio_factura: new FormControl(res[0].fecha_alta, Validators.required),
        precio: new FormControl(res[0].fecha_alta, Validators.required),
        iva: new FormControl(res[0].fecha_alta, Validators.required),
        fecha_factura: new FormControl(res[0].fecha_alta, Validators.required),
        fecha_alta: new FormControl(res[0].fecha_alta, Validators.required)
      });
    });
  }

  //Actualizar registro
  putEquipos(equipos: equiposI){
    this.EquiposService.putEquipos(equipos).subscribe( (res:ResponseI) =>{
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Cuenta Actualizada!',
      });
      this.getEquipos();
    })
  }

  //Borrar registros de la tabla
  deleteEquiposById(id_equipo: equiposI){
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
          this.EquiposService.deleteEquiposById(id_equipo).subscribe( (res:ResponseI) =>{
          this.getEquipos();
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
