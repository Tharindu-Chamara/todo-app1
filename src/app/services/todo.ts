import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
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

  async addTodo(task: string): Promise<void> {
    try {
      await addDoc(this.todoCollection, { task });
    } catch (error) {
      console.error(error);
      throw new Error('Error adding todo');
    }
    return;
  }

  async deleteTodo(id: string): Promise<void> {
    try {
      const todoDoc = doc(this.firestore, 'todos', id);
      await deleteDoc(todoDoc);
    } catch (error) {
      console.error('Error Deleting Todo', error);
      throw new Error('Error deleting todo');
    }
  }

  async updateTodo(id: string, task: string): Promise<void> {
    try {
      const todoDoc = doc(this.firestore, 'todos', id);
      await updateDoc(todoDoc, { task });
    } catch (error) {
      console.error('Error Updating Todo', error);
      throw new Error('Error update todo');
    }
  }
}
