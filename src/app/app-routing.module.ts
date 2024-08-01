import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AccesosComponent } from './components/accesos/accesos.component';
import { AreasComponent } from './components/areas/areas.component';
import { ConsultarhComponent } from './components/consultarh/consultarh.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { SistemasComponent } from './components/sistemas/sistemas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AccesosGuard } from './guards/accesos.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate:[AccesosGuard] },
    { path: 'accesos', component: AccesosComponent, canActivate:[AccesosGuard] },
    { path: 'areas', component: AreasComponent, canActivate:[AccesosGuard] },
    { path: 'consulta_rh', component: ConsultarhComponent, canActivate:[AccesosGuard] },
    { path: 'equipos', component: EquiposComponent, canActivate:[AccesosGuard] },
    { path: 'proveedores', component: ProveedoresComponent, canActivate:[AccesosGuard] },
    { path: 'sistemas', component: SistemasComponent, canActivate:[AccesosGuard] },
    { path: 'usuarios', component: UsuariosComponent, canActivate:[AccesosGuard] }

    /*
      { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'repartidor_entregas', component: RepartidorEntregasComponent, canActivate:[RoleGuard], data: { expectedRole: [2, 1] } },
    { path: 'repartidor_reglamento', component: RepartidorReglamentoComponent, canActivate:[RoleGuard], data: { expectedRole: [2, 1] } },
    { path: 'admin_usuarios', component: AdminUsuariosComponent, canActivate:[RoleGuard], data: { expectedRole: [1] } },
    { path: 'admin_mantenimiento', component: AdminMantenimientoComponent, canActivate:[RoleGuard], data: { expectedRole: [1] } },
    { path: 'admin_entregas', component: AdminEntregasComponent, canActivate:[RoleGuard], data: { expectedRole: [1] } },
    { path: 'admin_productos', component: AdminProductosComponent, canActivate:[RoleGuard], data: { expectedRole: [1] } },
    { path: 'admin_almacen', component: AdminAlmacenComponent, canActivate:[RoleGuard], data: { expectedRole: [1] } },
    { path: 'admin_ventas', component: AdminVentasComponent, canActivate:[RoleGuard], data: { expectedRole: [1] } },
    { path: 'admin_control_gasolina', component: AdminControlGasolinaComponent, canActivate:[RoleGuard], data: { expectedRole: [1] } },
    { path: 'admin_clientes', component: AdminClientesComponent, canActivate:[RoleGuard], data: { expectedRole: [1] } },
    */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
