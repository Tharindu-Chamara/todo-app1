import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todos } from "./todos/todos";

@Component({
  selector: 'app-root',
  imports: [Todos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'todo-app';
}
