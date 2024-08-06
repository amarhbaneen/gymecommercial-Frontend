import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymCaveFormService {

  constructor() { }

  GetCreditCardYears(): Observable<number[]>{
    let data: number [] = [];
    const startYear : number = new Date().getFullYear();
    const  endYear :number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of(data);


  }

  GetCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number [] = [];

    for (let month = startMonth; month <= 12; month++){

      data.push(month);
    }
    return of(data);


  }
}
