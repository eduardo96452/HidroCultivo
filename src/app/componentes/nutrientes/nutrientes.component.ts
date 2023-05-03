import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType, Colors } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js/dist';

@Component({
  selector: 'app-nutrientes',
  templateUrl: './nutrientes.component.html',
  styleUrls: ['./nutrientes.component.css']
})
export class NutrientesComponent {
  ultimas10Temperaturas: boolean[] = [];
  temperatura: boolean;
  ultimo10presentacion: boolean[] = [];

  ultimas10Potasionutri: boolean[] = [];
  Potasionutri: boolean;
  ultimo10presentacion2: boolean[] = [];

  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [
      { data: [0] }
    ]
  }
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  }

  public barChartLegend2 = true;
  public barChartPlugins2 = [];
  public barChartData2: ChartConfiguration<'bar'>['data'] = {
    datasets: [
      { data: [0] }
    ]
  }

  public barChartOptions2: ChartOptions = {
    responsive: true,
  };

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    let tiempos: string[] = [];
    const realtimeRef = this.db.list('/HydroGrow/NUTRIENTE NITROGENO FOSFORO ');

    realtimeRef.valueChanges().subscribe((temperaturas: boolean[]) => {
      this.ultimas10Temperaturas = temperaturas.slice(Math.max(temperaturas.length - 20, 0));
      this.temperatura = this.ultimas10Temperaturas[this.ultimas10Temperaturas.length - 1];
      for (let index = 0; index < this.ultimas10Temperaturas.length; index++) {
        this.ultimas10Temperaturas[index] = this.ultimas10Temperaturas[index];
        tiempos[index] = new Date().toLocaleTimeString();
      }
      console.log(this.temperatura);
      console.log(this.ultimas10Temperaturas);
      this.ultimo10presentacion[0] = this.temperatura;

      this.barChartData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
        datasets: [
          {
            data: this.ultimas10Temperaturas.map((value) => value ? 1 : 0),
            label: "Datos históricos de los nutrientes Nitrogeno y Fosforo",
            backgroundColor: ['rgba(0, 255, 0, 0.2)'],
            borderColor: ['rgb(50,205,50)'],
            borderWidth: 1
          }]
      }

      /*---------------------------------------------------*/

      const realtimeRef2 = this.db.list('/HydroGrow/NUTRIENTE POTASIO ');
      realtimeRef2.valueChanges().subscribe((potasio: boolean[]) => {
        this.ultimas10Potasionutri = potasio.slice(Math.max(potasio.length - 20, 0));
        this.Potasionutri = this.ultimas10Potasionutri[this.ultimas10Potasionutri.length - 1];
        for (let index = 0; index < this.ultimas10Potasionutri.length; index++) {
          this.ultimas10Potasionutri[index] = this.ultimas10Potasionutri[index];
          tiempos[index] = new Date().toLocaleTimeString();
        }
        console.log(this.Potasionutri);
        console.log(this.ultimas10Potasionutri);
        this.ultimo10presentacion2[0] = this.Potasionutri;

        this.barChartData2 = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
          datasets: [
            {
              data: this.ultimas10Potasionutri.map((value) => value ? 1 : 0),
              label: "Datos históricos de los nutrientes Potasio",
              backgroundColor: ['rgba(0, 255, 0, 0.2)'],
              borderColor: ['rgb(50,205,50)'],
              borderWidth: 1
            }]
        }
      });
    })
  }
}
