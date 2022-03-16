import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  interval,
  map,
  Observable,
  of,
  range,
  timer,
} from 'rxjs';
import { WaterData } from '../water-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public counter = new BehaviorSubject<number>(0);

  public readonly apiUrl =
    'https://erddap.emodnet-physics.eu/erddap/tabledap/EP_ERD_INT_RVFL_AL_TS_NRT.csv0?time%2CRVFL%2CRVFL_QC&EP_PLATFORM_ID=%223130579%22';

  constructor(private http: HttpClient) {}

  // createInterval(): Observable<string> {
  //   return interval(1000).pipe(
  //     //does something before returning
  //     filter((number) => number % 2 === 0),
  //     map((number) => 'number ' + number) //manipulates
  //   );
  // }

  // createTimer(): Observable<string> {
  //   return timer(5000, 2000).pipe(
  //     //delay until it runs, runs for each number
  //     filter((number) => number % 2 === 0),
  //     map((number) => 'number ' + number)
  //   );
  // }

  // getObservableArray(): Observable<number[]> {
  //   const array = [0, 5, 8, 12, 6];
  //   return of(array).pipe(map((array) => array.map((numb) => numb + 1)));
  // }

  // getRange(): Observable<number> {
  //   return range(0, 2000).pipe(filter((number) => number % 2 === 0));
  // }

  getCounter(): Observable<number> {
    return this.counter.pipe(map((n) => n ** n));
  }

  getApiData(): Observable<WaterData[]> {
    return this.http
      .get(this.apiUrl, { responseType: 'text' })
      .pipe(map(this.parseCSV), map(this.addIcon));
  }

  parseCSV(csv: string) {
    const tempArray = [];
    const splittedCsv = csv.split(/\r?\n/);
    for (const elem of splittedCsv) {
      const newLine = elem.split(',');
      const data: WaterData = {
        date: new Date(newLine[0]),
        value: parseFloat(newLine[1]),
      };
      tempArray.push(data);
    }
    return tempArray;
  }

  addIcon(arr: WaterData[]): WaterData[] {
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        arr[i].icon = 'start';
      } else {
        if (arr[i].value > arr[i - 1].value) {
          arr[i].icon = 'up';
        } else {
          if (arr[i].value < arr[i - 1].value) {
            arr[i].icon = 'down';
          } else {
            arr[i].icon = 'same';
          }
        }
      }
    }
    return arr;
  }
}
