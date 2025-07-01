import { Component, effect, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list';
  input = '';
  count = 2;

  todos: {id: number, title: string, checked:WritableSignal<boolean>}[] = [
    {
      id: 1,
      title: "Go to Gym",
      checked:signal(false)
    },
    {
      id: 2,
      title: "Drink Water",
      checked:signal(false)
    }
  ];

  checkTodo(id:number){
    this.todos.forEach(todo => {
      if(todo.id === id){
        todo.checked.set(!todo.checked());
      }
    });
    this.todos = this.todos.sort((a, b) => Number(a.checked()) - Number(b.checked()));
  }

  addTodo(){
    if(this.input === ''){
      return;
    }
    this.count++
    this.todos.push({
      id: this.count,
      title: this.input,
      checked: signal(false)
    });
    this.input = '';
  }

  deleteTodo(id:number){
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
