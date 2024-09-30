import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <ng-content card-list-delete-button></ng-content>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() name!: string;
}
