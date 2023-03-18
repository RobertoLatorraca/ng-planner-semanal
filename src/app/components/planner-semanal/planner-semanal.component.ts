import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Day } from 'src/app/models/day';
import { Group } from 'src/app/models/group';
import { View } from 'src/app/models/view';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-planner-semanal',
  templateUrl: './planner-semanal.component.html',
  styleUrls: ['./planner-semanal.component.scss']
})
export class PlannerSemanalComponent implements OnInit, OnDestroy {

  readonly Group = Group;
  readonly Day = Day;
  readonly View = View;

  private remainingTasksSubject!: Subscription;

  datesOfWeek: number[] = [];
  view: View = View.all;
  remainingTasks!: number;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.remainingTasksSubject = this.todoService.onRemainingTasks().subscribe({
      next: c => this.remainingTasks = c
    });
    this.datesOfWeek = this.getDates();
  }

  ngOnDestroy(): void {
    this.remainingTasksSubject.unsubscribe();
  }
  
  showTasks(view: View): void {
    this.view = view;
  }

  clearCompletedTasks(): void {
    this.todoService.clearCompletedTasks();
  }

  getDates(): number[] {
    let now: Date = new Date();
    let dayNumber: number = now.getDay();
    let dayInMillis: number = 24 * 60 * 60 * 1000;
    let firstDayOfWeek: Date = new Date();
    firstDayOfWeek.setTime(dayNumber == 0 ?
      now.getTime() - 6 * dayInMillis :
      now.getTime() - (dayNumber - 1) * dayInMillis);
    let result: number[] = [];
    for (let i = 0; i < 7; i++) {
      let temp = new Date();
      temp.setTime(firstDayOfWeek.getTime() + i * dayInMillis);
      result.push(temp.getDate());
    }
    return result;
  }

}
