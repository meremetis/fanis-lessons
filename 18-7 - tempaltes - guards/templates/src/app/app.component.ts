import { CommonModule, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgTemplateOutlet, NgFor, NgStyle],
})
export class AppComponent {
  title = 'templates';
  lists = [
    { name: 'Users', color: 'red' },
    { name: 'Products', color: 'green' },
    { name: 'Test', color: 'yellow' },
    { name: 'Books', color: 'black' },
  ];
}
