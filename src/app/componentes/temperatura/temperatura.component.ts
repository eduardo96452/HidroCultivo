import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map  } from 'rxjs';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType, Colors  } from 'chart.js';
import { BaseChartDirective  } from 'ng2-charts';
import { RealTime } from './temperatura.type';
import { Chart } from 'chart.js/dist';
//import { Label } from 'chart.js';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent{
  items: any[];
  temperaturas: number[] = [];
  temperatura: number;

  datos: RealTime = {
    'CALIDAD DEL AIRE ': 0,
    "TEMPERATURA ": 0,
  }

  myChart: Chart;

  title: string = 'El proyecto mas perron';

  public barChartLegend = true;
  public barChartPlugins = [];
   
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Temperatura'],
    datasets: [
      { data: [ 0 ]}
    ]
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  }
  

  constructor(private db:AngularFireDatabase){
    /*this.db.object('/RealTime').valueChanges().subscribe(data => {
      console.log(data); // Aquí tienes los datos dentro de la clave "RealTime"
    });*/

  }
  ngOnInit(): void {

    const realtimeRef = this.db.object('/RealTime');
    realtimeRef.valueChanges().subscribe((data: RealTime) => {
      console.log(data);

      this.datos = data;
      this.temperatura = data['TEMPERATURA '];

      this.barChartData = {
        datasets: [
          { data: [ data['TEMPERATURA ']], label: "Temperatura"}
        ]
      }

    });


  }
 

  lineChartLabels:BaseChartDirective["labels"] = ['00:00'];

  lineChartOptions = { responsive:true, };

  lineChartLegend = true;

  // shufedata(){
  //   this.lineChartData = [
  //     { data: this.temperaturas, label:'Temperatura del Agua'}
  //   ];
  // }

}