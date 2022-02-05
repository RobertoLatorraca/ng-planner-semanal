import { Category } from "./category";

export class Task {
    id!: string;
    category!: Category;
    task!: string;
    completed: boolean = false;
}
