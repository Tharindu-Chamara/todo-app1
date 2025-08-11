import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo1 } from '../models/todo.model';

@Component({
  selector: 'app-todos',
  imports: [ReactiveFormsModule],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  private todoService = inject(TodoService);
  private fb = inject(FormBuilder);

  todos = signal<Todo1[]>([]);

  constructor() {
    this.todoService.getTodos().subscribe({
      next: (todo) => {
        this.todos.set(todo);
      },
    });
  }

  todoFrom = this.fb.group({
    task: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {}
}
