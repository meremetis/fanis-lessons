import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-task-component',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule],
  templateUrl: './task-component.component.html',
  styleUrl: './task-component.component.css'
})
export class TaskComponentComponent {
  templateRef = input<TemplateRef<any> | null>(null);
}
