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
/*import { provideFirestore,getFirestore } from '@angular/fire/firestore';*/

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


import { TemperaturaComponent } from './componentes/temperatura/temperatura.component';
import { AirecalidadComponent } from './componentes/airecalidad/airecalidad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    TemperaturaComponent,
    AirecalidadComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /*provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())*/
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
