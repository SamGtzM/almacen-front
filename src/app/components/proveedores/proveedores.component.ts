import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { proveedoresI } from '../../models/proveedores.interface';
import { ResponseI } from '../../models/response.interface';
import { ProveedoresService } from '../../services/proveedores.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent implements OnInit {

  public estado: Array<proveedoresI> = [];

  singupForm = new FormGroup({
    id_provedor: new FormControl('', Validators.required),
    nombre_proveedor: new FormControl('', Validators.required),
    activo: new FormControl('', Validators.required)
  });
  
  getproveedoresIdForm = new FormGroup({
    id_provedor: new FormControl('', Validators.required),
    nombre_proveedor: new FormControl('', Validators.required),
    fecha_alta: new FormControl('')
  })

  //Cabeceras tabla
  displayedColumns: string[] = [
    'ID',
    'Proveedor',
    'Fecha alta'
  ];
  dataSource!:MatTableDataSource<proveedoresI>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private ProveedoresService: ProveedoresService,
  ) { }

  ngOnInit(): void {
    this.getProveedores();
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

  //Llenando tabla
  getProveedores(){
    this.ProveedoresService.getProveedores().subscribe( (res:any) =>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.estado = res;
    });
  }

  //Altas
  singupProveedores(proveedores: proveedoresI){
    this.ProveedoresService.singupProveedores(proveedores).subscribe( (res:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Guardado!',
        text: 'Registrado correctamente!',
      });
      this.getProveedores();
    });
  }

  //Llenar modal por id
  getProveedoresById(id_provedor: proveedoresI){
    this.ProveedoresService.getProveedoresById(id_provedor).subscribe( (res:any) =>{
      this.getproveedoresIdForm = new FormGroup({
        id_provedor: new FormControl(res[0].id_acceso, Validators.required),
        nombre_proveedor: new FormControl(res[0].tipo_acceso, Validators.required),
        fecha_alta: new FormControl(res[0].fecha_alta, Validators.required)
      });
    });
  }

  //Actualizar registro
  putProveedores(proveedores: proveedoresI){
    this.ProveedoresService.putProveedores(proveedores).subscribe( (res:ResponseI) =>{
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Cuenta Actualizada!',
      });
      this.getProveedores();
    })
  }

  //Borrar registros de la tabla
  deleteProveedoresById(id_provedor: proveedoresI){
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
          this.ProveedoresService.deleteProveedoresById(id_provedor).subscribe( (res:ResponseI) =>{
          this.getProveedores();
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
