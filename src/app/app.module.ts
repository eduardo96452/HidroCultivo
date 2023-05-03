import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { TemperaturaComponent } from './componentes/temperatura/temperatura.component';
import { AirecalidadComponent } from './componentes/airecalidad/airecalidad.component';
import { PhComponent } from './componentes/ph/ph.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { LuzComponent } from './luz/luz.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NutrientesComponent } from './componentes/nutrientes/nutrientes.component';

const appRoutes: Routes = [
  {path:'', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'principale', component:PrincipalComponent},
  {path:'temperatura', component:TemperaturaComponent},
  {path:'airecalidad', component:AirecalidadComponent},
  {path:'ph', component:PhComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    TemperaturaComponent,
    AirecalidadComponent,
    PhComponent,
    NavbarComponent,
    LuzComponent,
    NutrientesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgChartsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
