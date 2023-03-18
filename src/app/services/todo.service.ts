import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static tasksSubject = new BehaviorSubject<Task[]>([]);
  private static remainingTasksSubject =new BehaviorSubject<number>(0);
  private static todoList: Task[];

  constructor(private localStorageService: LocalStorageService) {
    if (TodoService.todoList == null) {
      TodoService.todoList = localStorageService.load();
      this.countRemainingTasks();
      this.sendTasks();
    }
  }

  // habilitar la suscripcion al observable
  public onTask(): Observable<Task[]> {
    return TodoService.tasksSubject.asObservable();
  }

  // habilitar la suscripcion al observable
  public onRemainingTasks(): Observable<number> {
    return TodoService.remainingTasksSubject.asObservable();
  }

  public addTask(task: Task): void {
    task.id = this.createUUID();
    TodoService.todoList.push(task);
    this.countRemainingTasks();
    this.sendTasks();
  }

  public updateTask(task: Task): void {
    let i: number = TodoService.todoList.findIndex((t) => t.id == task.id);
    if (i > -1) {
      TodoService.todoList.splice(i, 1, task);
    }
    this.countRemainingTasks();
    this.sendTasks();
  }

  public removeTask(task: Task): void {
    TodoService.todoList = TodoService.todoList.filter(t =>  t !== task);
    this.countRemainingTasks();
    this.sendTasks();
  }

  public clearCompletedTasks(): void {
    TodoService.todoList = TodoService.todoList.filter(t => (t.completed == false));
    this.sendTasks();
  }

  private countRemainingTasks(): void {
    TodoService.remainingTasksSubject.next(
      TodoService.todoList.filter(t => t.completed == false).length);
  }

  private sendTasks(): void {
    this.localStorageService.save(TodoService.todoList);
    TodoService.tasksSubject.next(TodoService.todoList);
  }

  private createUUID(): string {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = (dt + Math.random() * 16 ) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r :(r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

}
