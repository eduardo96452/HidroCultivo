import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map  } from 'rxjs';


@Component({
  selector: 'app-temperatura',
  /*templateUrl: './temperatura.component.html',*/
  template: `
    <ul>
      <li *ngFor="let item of items">
        {{ item | json }}
      </li>
    </ul>
  `,
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
}
