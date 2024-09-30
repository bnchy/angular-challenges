import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ComputationPipe } from './pipes/computation-pipe';

@Component({
  standalone: true,
  imports: [NgFor, ComputationPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | computation: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
