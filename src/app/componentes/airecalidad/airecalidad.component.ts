import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType, Colors } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Chart } from 'chart.js/dist';

@Component({
  selector: 'app-airecalidad',
  templateUrl: './airecalidad.component.html',
  styleUrls: ['./airecalidad.component.css']
})
export class AirecalidadComponent {
  ultimas10Temperaturas: number[] = [];
  temperatura: number;
  ultimo10presentacion: number[] = [];


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
    maintainAspectRatio: false
  };
  constructor(private db: AngularFireDatabase) { }
  ngOnInit(): void {
    let tiempos: string[] = [];
    const realtimeRef = this.db.list('/HydroGrow/CALIDAD DEL AIRE ');

    realtimeRef.valueChanges().subscribe((temperaturas: number[]) => {
      this.ultimas10Temperaturas = temperaturas.slice(Math.max(temperaturas.length - 20, 0));
      this.temperatura = Number(this.ultimas10Temperaturas[this.ultimas10Temperaturas.length - 1].toFixed(2));
      for (let index = 0; index < this.ultimas10Temperaturas.length; index++) {
        this.ultimas10Temperaturas[index] = Number(this.ultimas10Temperaturas[index].toFixed(2));
        tiempos[index] = new Date().toLocaleTimeString();
      }
      console.log(this.temperatura);
      console.log(this.ultimas10Temperaturas);
      this.ultimo10presentacion[0] = this.temperatura;

      this.barChartData = {
        labels: [new Date().toLocaleTimeString()],
        datasets: [
          {

            data: this.ultimo10presentacion, 
            label: "Calidad del aire en tiempo real",
            backgroundColor: ['rgb(31, 138, 112)'],
            borderColor: ['rgba(0, 255, 0, 0.2)'],
            borderWidth: 1
          },
        ]
      }

      this.barChartData2 = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
        datasets: [
          {
            data: this.ultimas10Temperaturas, label: "Datos históricos de Calidad del aire",
            backgroundColor: [
              'rgba(0, 255, 0, 0.2)'
            ],
            borderColor: [
              'rgb(31, 138, 112)'
            ],
            borderWidth: 1
          }]
      }
    });
  }
}
