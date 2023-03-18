import { Day } from "./day";
import { Group } from "./group";

export class Task {
    id!: string;
    task!: string;
    position!: number;
    group!: Group;
    day!: Day;
    completed: boolean = false;
}
