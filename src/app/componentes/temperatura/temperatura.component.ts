import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map  } from 'rxjs';
import { ChartDataset, ChartOptions, ChartType, Colors  } from 'chart.js';
import { BaseChartDirective  } from 'ng2-charts';
//import { Label } from 'chart.js';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  /*template: `
    <ul>
      <li *ngFor="let item of items">
        {{ item | json }}
      </li>
    </ul>
  `,*/
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent{
  items: any[];
  temperaturas: number[] = [];

  

  constructor(private db:AngularFireDatabase){
    // Obtener referencia a la colección de datos en Firebase
    const itemsRef = this.db.list('Historico');

    // Obtener los datos como un array y asignarlos a la variable items
    itemsRef.valueChanges().subscribe(items => {
      this.items = items;
      
      for (const itemKey in this.items) {
        if (this.items.hasOwnProperty(itemKey)) {
          const temperatura = this.items[itemKey]["TEMPERATURA"];
          this.temperaturas.push(temperatura.toFixed(2));
        }
      }
      
      console.log(this.temperaturas);
    });
  }

  
  lineChartData:ChartDataset[] = [
    { data: this.temperaturas, label:'Temperatura del Agua'}
  ];

  lineChartLabels:BaseChartDirective["labels"] = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','21:00','21:00'];

  lineChartOptions = { responsive:true, };

  lineChartLegend = true;

  shufedata(){
    this.lineChartData = [
      { data: this.temperaturas, label:'Temperatura del Agua'}
    ];
  }

}
