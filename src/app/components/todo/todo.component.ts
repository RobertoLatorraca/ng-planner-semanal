import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Group } from 'src/app/models/group';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';
import { Day } from 'src/app/models/day';
import { View } from 'src/app/models/view';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  @Input()
  group!: Group;

  @Input()
  day!: Day;

  @Input()
  view!: View;

  tasksList: Task[] = [];
  private todoSubscription!: Subscription;
  
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoSubscription = this.todoService.onTask().subscribe({
      next: todoList => this.tasksList = todoList
    });
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
  }

  filter(): Task[] {
    let result: Task[] = this.filterByGroup(this.tasksList);
    if (this.group == Group.weekPlannig) result = this.filterByDay(result);
    result = this.filterByView(result);
    return result;
  }

  addTask(event: any): void {
    let task = new Task();
    task.task = event.srcElement.value;
    task.group = this.group;
    task.day = this.day;
    task.position = this.tasksList.length // mejorar algoritmo de posicion
    event.srcElement.value = '';
    this.todoService.addTask(task);
  }

  deleteTask(task: Task): void {
    this.todoService.removeTask(task);
  }

  toggleCompletedTask(task: Task): void {
    task.completed = !task.completed;
    this.todoService.updateTask(task);
  }

  private filterByGroup(tasks: Task[]): Task[] {
    return tasks.filter(
      t => t.group == this.group
    );
  }

  private filterByDay(tasks: Task[]): Task[] {
    return tasks.filter(
      t => t.day == this.day
    );
  }

  private filterByView(tasks: Task[]): Task[] {
    switch (this.view) {
      case View.active:
        return tasks.filter(t => t.completed == false);
      case View.completed:
        return tasks.filter(t => t.completed == true);
      default:
        return tasks;
    }
  }

}
