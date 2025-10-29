import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoAppComponent } from './MyComponent/todo-app/todo-app';

@Component({
  selector: 'app-root',
  imports: [TodoAppComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {

}