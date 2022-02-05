import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Show } from 'src/app/models/show';
import { Task } from 'src/app/models/task';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  readonly Category = Category;

  @Input()
  category!: Category;

  @Input()
  showTasks!: Show;

  @Input()
  tasks: Task[] = [];
  
  @Output()
  taskChange: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  filter(category: Category): Task[] {
    switch (this.showTasks) {
      case Show.all:
        return this.tasks.filter(t => t.category == category);
      case Show.active:
        return this.tasks.filter(t => t.category == category && t.completed == false);
      case Show.completed:
        return this.tasks.filter(t => t.category == category && t.completed == true);
    }
  }

  addTask(task: any): void {
    let t = new Task();
    t.id = this.createUUID();
    t.task = task.srcElement.value;
    t.category = this.category;
    this.localStorageService.addTask(t);
    task.srcElement.value = '';
    this.taskChange.emit(task);
  }

  deleteTask(task: Task): void {
    this.localStorageService.deleteTask(task);
    this.taskChange.emit(task);
  }

  toggleCompletedTask(task: Task): void {
    this.localStorageService.toggleCompletedTask(task);
    this.taskChange.emit(task);
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
