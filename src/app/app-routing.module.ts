import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { TemperaturaComponent } from './componentes/temperatura/temperatura.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'principal', component:PrincipalComponent},
  {path: 'temperatura', component:TemperaturaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
