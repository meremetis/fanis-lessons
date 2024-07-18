import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskComponentComponent } from './task-component/task-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskComponentComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'task';
}
