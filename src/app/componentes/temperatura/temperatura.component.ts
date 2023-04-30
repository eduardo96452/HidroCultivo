import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/compat/database';
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
  temperaturasRef: AngularFireList<any>;
  temperaturas$: Observable<number[]>;

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
    datasets: [{ data: [ 0 ]}]
  }
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  }

  constructor(private db:AngularFireDatabase){
    // Obtiene una referencia a la lista de temperatura
    this.temperaturasRef = db.list('HydroGrow/TEMPERATURA ');

    // Recupera los 7 últimos valores de temperatura
    this.temperaturas$ = this.temperaturasRef.valueChanges().pipe(
      map((temperaturas: number[]) => {
        
        return temperaturas.slice(Math.max(temperaturas.length - 10, 0));
      })
    );
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
}