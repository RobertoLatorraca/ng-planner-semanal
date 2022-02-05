import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlannerSemanalComponent } from './components/planner-semanal/planner-semanal.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlannerSemanalComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
