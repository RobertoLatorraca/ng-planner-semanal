import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public getDatesOfWeek(): number[] {
    let now: Date = new Date();
    let dayNumber: number = now.getDay();
    let dayInMillis: number = 24 * 60 * 60 * 1000;
    let firstDayOfWeek: Date = new Date();
    firstDayOfWeek.setTime(dayNumber == 0 ?
      now.getTime() - 6 * dayInMillis :
      now.getTime() - (dayNumber - 1) * dayInMillis);
    let result: number[] = [];
    for (let i = 0; i < 7; i++) {
      let temp = new Date();
      temp.setTime(firstDayOfWeek.getTime() + i * dayInMillis);
      result.push(temp.getDate());
    }
    return result;
  }

  public generateUUID(): string {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = (dt + Math.random() * 16 ) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r :(r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

}
