import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public addTask(task: Task): void {
    let tasks = this.loadPlanner();
    tasks.push(task);
    this.savePlanner(tasks);
  }

  public deleteTask(task: Task): void {
    let tasks = this.loadPlanner();
    tasks = tasks.filter(t => !(t.id == task.id));
    this.savePlanner(tasks);
  }

  public toggleCompletedTask(task: Task): void {
    let tasks = this.loadPlanner();
    let i: number = tasks.findIndex((t) => t.id == task.id);
    if (i > -1) {
      task.completed = !task.completed;
      tasks.splice(i, 1, task);
      this.savePlanner(tasks);
    }
  }

  public clearCompletedTasks(): void {
    let tasks = this.loadPlanner();
    tasks = tasks.filter(t => (t.completed == false));
    this.savePlanner(tasks);
  }

  public loadPlanner(): Task[] {
    var retrievedObject = localStorage.getItem("planner-semanal");
    if (retrievedObject) return JSON.parse(retrievedObject!);
    return [];
  }

  private savePlanner(tasks: Task[]): void {
    localStorage.setItem("planner-semanal", JSON.stringify(tasks));
  }

}
