import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Group } from 'src/app/models/group';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';
import { DragAndDropService } from 'src/app/services/drag-and-drop.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  @Input()
  group!: Group;

  tasksList: Task[] = [];
  private todoSubscription!: Subscription;
  private statusSubscription!: Subscription;
  
  constructor(private todoService: TodoService, private dragAndDropService: DragAndDropService) { }

  ngOnInit(): void {
    this.todoSubscription = this.todoService.onTask().subscribe({
      next: tasksMap => this.tasksList = tasksMap.get(Group[this.group])!
    });
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
  }

  filter(): Task[] {
    let result: Task[] = this.filterByGroup(this.tasksList);
    result = this.filterByView(result);
    return result;
  }

  addTask(event: any): void {
    let task = new Task();
    task.title = event.srcElement.value;
    event.srcElement.value = '';

    this.todoService.addTask(task, this.group);
  }

  removeTask(task: Task): void {
    this.todoService.removeTask(task, this.group);
  }

  toggleCompletedTask(task: Task): void {
    task.completed = !task.completed;
    this.todoService.notifyChanges();
  }

  itemDragged(event: any, task: Task): void {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      this.dragAndDropService.setData({sourceData: task, sourceCtrl: this});
    }
    event.stopPropagation();
  }

  itemDragOver(event: any, task?: Task): void {
    event.preventDefault();
    let dragAndDropData = this.dragAndDropService.getData();
    this.dragAndDropService.setData({
      action: 'move',
      sourceData: dragAndDropData.sourceData,
      sourceCtrl: dragAndDropData.sourceCtrl,
      targetData: task,
      targetCtrl: this,
      //dropPos: task?.position
    });
    event.stopPropagation();
  }

  ctrlDrop(event: any): void {
    let dragAndDropData = this.dragAndDropService.getData();
    let task: Task = dragAndDropData.sourceData;
    //task.group = dragAndDropData.targetCtrl.group;
    //task.day = dragAndDropData.targetCtrl.day;
    this.todoService.notifyChanges();
  }

  private filterByGroup(tasks: Task[]): Task[] {
    /*return tasks.filter(
      t => t.group == this.group
    );*/
    return [];
  }

  private filterByView(tasks: Task[]): Task[] {/*
    switch (this.view) {
      case View.active:
        return tasks.filter(t => t.completed == false);
      case View.completed:
        return tasks.filter(t => t.completed == true);
      default:
        return tasks;
    }*/
    return [];
  }

}
