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
  selectedTodo = signal<Todo1 | null>(null);
  successMessage = signal<String | null>(null);

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

  onSubmit() {
    const value = this.todoFrom.value;

    if (this.todoFrom.invalid) {
      return;
    }

    if (this.selectedTodo()) {
      this.todoService
        .updateTodo(this.selectedTodo()!.id!, value.task!)
        .then(() => {
          this.successMessage.set('Todo Update Successfully');
          this.selectedTodo.set(null);
          this.todoFrom.reset();
          setTimeout(() => {
            this.successMessage.set(null);
          }, 3000);
        });
    } else {
      this.todoService.addTodo(value.task!).then(() => {
        this.successMessage.set('Todo Addes Successfully');
        this.todoFrom.reset();
        setTimeout(() => {
          this.successMessage.set(null);
        }, 3000);
      });
    }
  }

  onDelete(id: string) {
    alert('Are you want to Delete');
    this.todoService.deleteTodo(id).then(() => {
      this.successMessage.set('Todo Delete Successfully');
      setTimeout(() => {
        this.successMessage.set(null);
      }, 3000);
    });
  }

  onEdit(todo: Todo1) {
    this.selectedTodo.set(todo);
    this.todoFrom.setValue({ task: todo.task });
  }

  cancelEdit() {
    this.selectedTodo.set(null);
    this.todoFrom.reset();
  }
}
