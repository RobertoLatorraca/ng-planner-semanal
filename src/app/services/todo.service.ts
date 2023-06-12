import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { LocalStorageService } from './local-storage.service';
import { Todo } from '../models/todo';
import { UtilsService } from './utils.service';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static tasksSubject = new BehaviorSubject<Map<string, Task[]>>(new Map<string, Task[]>());
  private static remainingTasksSubject =new BehaviorSubject<number>(0);
  private static todo: Todo;

  constructor(private localStorageService: LocalStorageService, private utilsService: UtilsService) {
      TodoService.todo = new Todo();
      if(localStorageService.load() !== null) TodoService.todo.setTasksMap(localStorageService.load()!);
      this.notifyChanges()
  }

  // habilitar la suscripcion al observable
  public onTask(): Observable<Map<string, Task[]>> {
    return TodoService.tasksSubject.asObservable();
  }

  // habilitar la suscripcion al observable
  public onRemainingTasks(): Observable<number> {
    return TodoService.remainingTasksSubject.asObservable();
  }

  public addTask(task: Task, group: Group): void {
    task.id = this.utilsService.generateUUID();
    TodoService.todo.addTaskToMap(task, group);
    this.notifyChanges()
  }

  public removeTask(task: Task, group: Group): void {
    TodoService.todo.removeTaskFromMap(task, group);
    this.notifyChanges()
  }

  public clearCompletedTasks(): void {
    //TodoService.todo = TodoService.todoList.filter(t => (t.completed == false));
    this.sendTasks();
  }

  public notifyChanges(): void {
    this.countRemainingTasks();
    this.sendTasks();
  }

  private countRemainingTasks(): void {
    


    //TodoService.remainingTasksSubject.next(
      //TodoService.todo.filter(t => t.completed == false).length);
  }

  private sendTasks(): void {
    this.localStorageService.save(TodoService.todo);
    TodoService.tasksSubject.next(TodoService.todo.getTasksMap());
  }

}
