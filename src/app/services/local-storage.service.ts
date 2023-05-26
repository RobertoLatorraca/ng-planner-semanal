import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public load(): Map<string, Task[]> | null {
    var retrievedObject = localStorage.getItem("planning");
    if (retrievedObject) return new Map(JSON.parse(retrievedObject!));
    return null;
  }

  public save(todo: Todo): void {
    localStorage.setItem(
      "planning",
      JSON.stringify(Array.from(todo.getTasksMap()))
    );
  }

}
