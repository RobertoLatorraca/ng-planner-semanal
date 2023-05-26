import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  private static data: {
    action: string;
    sourceData: any;
    sourceCtrl: any;
    targetData: any;
    targetCtrl:any;
    dropPosition: number;
  };

  constructor() { }

  public setData(data: any) {
    DragAndDropService.data = data;
  }

  public getData(): any {
    return DragAndDropService.data;
  }

}
