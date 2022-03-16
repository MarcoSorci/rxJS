/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { SeaData } from './sea-data';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  seaData: SeaData | undefined
  seaDataArray: SeaData[] = []
  constructor(private dataServ: DataService) {}

  ngOnInit(): void {
    // this.dataServ.createInterval().subscribe((number) => console.log(number));
    // this.dataServ.createTimer().subscribe((number) => console.log('timer ' + number));
    //this.dataServ.getObservableArray().subscribe(data => console.log(data)
    //this.dataServ.getRange().subscribe(number=>console.log(number)
    this.dataServ.getCounter().subscribe((count) => console.log(count));
  }

  incrementCounter(): void {
    this.dataServ.counter.next(this.dataServ.counter.value + 1);
  }

  // getApiData() {
  //   this.dataServ.getApiData().subscribe(data=>{
  //     const splittedList = data.split('\n');
  //     splittedList.forEach(elem => {
  //       this.seaDataArray.push(elem)
  //     });
  //   }
  // }

}
