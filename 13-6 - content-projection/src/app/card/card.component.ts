import { Component, Directive, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  standalone: true,
  selector: 'app-card-footer',
})
export class CardFooterDirective {}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  // making input required
  @Input({ required: true }) title: string = '';
}
