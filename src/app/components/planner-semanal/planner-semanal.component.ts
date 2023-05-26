import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/models/group';
import { Status } from 'src/app/models/status';
import { TodoService } from 'src/app/services/todo.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-planner-semanal',
  templateUrl: './planner-semanal.component.html',
  styleUrls: ['./planner-semanal.component.scss']
})
export class PlannerSemanalComponent implements OnInit, OnDestroy {

  readonly GROUP = Group;
  readonly STATUS = Status;

  private remainingTasksSubject!: Subscription;

  datesOfWeek: number[] = [];
  status: Status = Status.all;
  remainingTasks!: number;

  constructor(private todoService: TodoService, private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.remainingTasksSubject = this.todoService.onRemainingTasks().subscribe({
      next: c => this.remainingTasks = c
    });
    this.datesOfWeek = this.utilsService.getDatesOfWeek();
  }

  ngOnDestroy(): void {
    this.remainingTasksSubject.unsubscribe();
  }
  
  showTasks(status: Status): void {
    this.status = status;
  }

  clearCompletedTasks(): void {
    this.todoService.clearCompletedTasks();
  }

}
