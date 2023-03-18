import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public load(): Task[] {
    var retrievedObject = localStorage.getItem("planning");
    if (retrievedObject) return JSON.parse(retrievedObject!);
    return [];
  }

  public save(todoList: Task[]): void {
    localStorage.setItem("planning", JSON.stringify(todoList));
  }

}
