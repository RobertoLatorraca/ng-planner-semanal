import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Show } from 'src/app/models/show';
import { Task } from 'src/app/models/task';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-planner-semanal',
  templateUrl: './planner-semanal.component.html',
  styleUrls: ['./planner-semanal.component.scss']
})
export class PlannerSemanalComponent implements OnInit {

  datesOfWeek: number[] = [];

  readonly Category = Category;
  readonly Show = Show;

  tasks: Task[] = [];

  showTasks: Show = Show.all;
  tasksLeft!: number

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.tasks = this.localStorageService.loadPlanner();
    this.countLeft();
    this.datesOfWeek = this.getDates();
  }

  countLeft(): void {
    this.tasksLeft = this.tasks.filter(t => t.completed == false).length;
  }
  
  show(show: Show): void {
    this.showTasks = show;
  }

  clearCompletedTasks(): void {
    this.localStorageService.clearCompletedTasks();
    this.ngOnInit();
  }

  refreshPlanner(taskChanged: Task) {
    this.ngOnInit();
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
