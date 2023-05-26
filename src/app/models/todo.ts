import { Group } from "./group"
import { Task } from "./task"

export class Todo {

    private tasksMap = new Map<string, Task[]>();

    constructor() {
        for(let i in Group) {
            if(!isNaN(Number(i))) {
                this.tasksMap.set(Group[i], []);
            }
        }
    }

    public getTasksMap(): Map<string, Task[]> {
        return this.tasksMap;
    }

    public setTasksMap(todo: Map<string, Task[]>): void {
        this.tasksMap = todo;
    }

    public addTaskToMap(task: Task, group: Group): void {
        let tasksList: Task[] = [];
        if(this.tasksMap.get(Group[group]) !== undefined) {
            tasksList = this.tasksMap.get(Group[group])!;
        }
        tasksList.push(task);
        this.tasksMap.set(Group[group], tasksList);
    }

    public removeTaskFromMap(task: Task, group: Group): void {
        let tasksList: Task[] = this.tasksMap.get(Group[group])!;
        tasksList = tasksList.filter(t =>  t !== task);
        this.tasksMap.set(Group[group], tasksList);
    }

}