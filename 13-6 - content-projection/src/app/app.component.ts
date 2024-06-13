import { Component } from '@angular/core';
import { CardComponent, CardFooterDirective } from './card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, CardFooterDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '13-6';
}
