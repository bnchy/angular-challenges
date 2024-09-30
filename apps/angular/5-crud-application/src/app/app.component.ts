import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoService } from './service/todo.service';
import { Todo } from './types/todo.t';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <div class="todo-container">
      <mat-progress-spinner
        *ngIf="isLoading()"
        mode="indeterminate"
        diameter="60"
        color="primary"></mat-progress-spinner>

      <div class="todo-list" *ngIf="!isLoading()">
        <div *ngFor="let todo of todos()">
          {{ todo.title }}
          <button (click)="update(todo)">Update</button>
          <button (click)="delete(todo.id)">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .todo-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 99vh;
        width: 100%;
      }

      .todo-list {
        width: 100%;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  todos = signal<Todo[]>([]);
  isLoading = signal<boolean>(false);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.fetchTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  fetchTodos() {
    this.isLoading.set(true);
    this.todoService.fetchTodos().subscribe({
      next: (todos) => {
        this.todos.set(todos);
        this.isLoading.set(false);
      },
      error: () => {
        console.log("Error: couldn't fetch the todos");
        this.isLoading.set(false);
        alert("Error: couldn't fetch the todos");
      },
    });
  }
  update(todo: Todo) {
    const currentTodos = this.todos();
    this.isLoading.set(true);
    this.todoService.updateTodo(todo).subscribe({
      next: (updatedTodo) => {
        this.todos.set(
          this.todos().map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
        );
        this.isLoading.set(false);
      },
      error: () => {
        console.log('Error updating todo');
        this.todos.set(currentTodos);
        this.isLoading.set(false);
        alert('Error updating todo');
      },
    });
  }

  delete(id: number) {
    this.isLoading.set(true);
    const currentTodos = this.todos();

    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos.set(this.todos().filter((t) => t.id !== id));
        this.isLoading.set(false);
      },
      error: () => {
        console.log("Error: couldn't delete the todo");
        this.todos.set(currentTodos);
        this.isLoading.set(false);
        alert("Error: couldn't delete the todo");
      },
    });
  }
}
