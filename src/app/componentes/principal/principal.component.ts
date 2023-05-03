import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType, Colors } from 'chart.js';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  ultimas10Luces: boolean[] = [];
  luces: boolean;
  ultimo10presentacion: boolean[] = [];

  ultimas10flujoagua: boolean[] = [];
  flujoagua: boolean;

  ultimas10llenadoagua: boolean[] = [];
  llenadoagua: boolean;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    let tiempos: string[] = [];
    const realtimeRef = this.db.list('/HydroGrow/LUCES LED ');

    realtimeRef.valueChanges().subscribe((temperaturas: boolean[]) => {
      this.ultimas10Luces = temperaturas.slice(Math.max(temperaturas.length - 20, 0));
      this.luces = this.ultimas10Luces[this.ultimas10Luces.length - 1];

      for (let index = 0; index < this.ultimas10Luces.length; index++) {
        this.ultimas10Luces[index] = this.ultimas10Luces[index];
        tiempos[index] = new Date().toLocaleTimeString();
      }
      console.log(this.luces);
      console.log(this.ultimas10Luces);
    });

    const realtimeflujoagua = this.db.list('/HydroGrow/FLUJO DE AGUA ');
    realtimeflujoagua.valueChanges().subscribe((aguadeflujo: boolean[]) => {
      this.ultimas10flujoagua = aguadeflujo.slice(Math.max(aguadeflujo.length - 20, 0));
      this.flujoagua = this.ultimas10flujoagua[this.ultimas10flujoagua.length - 1];
      console.log(this.flujoagua);
      console.log(this.ultimas10flujoagua);
    });

    const realtimellenadoagua = this.db.list('/HydroGrow/LLENADO DE AGUA ');
    realtimellenadoagua.valueChanges().subscribe((aguallenado: boolean[]) => {
      this.ultimas10llenadoagua = aguallenado.slice(Math.max(aguallenado.length - 20, 0));
      this.llenadoagua = this.ultimas10llenadoagua[this.ultimas10llenadoagua.length - 1];
      console.log(this.llenadoagua);
      console.log(this.ultimas10llenadoagua);
    });

  }

}
