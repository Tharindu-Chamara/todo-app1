import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  deleteDoc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Todo1 } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private firestore = inject(Firestore);
  private todoCollection = collection(this.firestore, 'todos');

  getTodos(): Observable<Todo1[]> {
    return collectionData(this.todoCollection, { idField: 'id' }) as Observable<
      Todo1[]
    >;
  }

  addTodo(task: string): Promise<void> {
    return addDoc(this.todoCollection, { task }).then(() => { });
  }

  deleteTodo(id: string): Promise<void> {
    const todoDoc = doc(this.firestore, 'todos', id);
    return deleteDoc(todoDoc);
  }

  updateTodo(id: string, task: string): Promise<void> {
    const todoDoc = doc(this.firestore, 'todos', id);
    return updateDoc(todoDoc, { task }).then(() => { });
  }
}
