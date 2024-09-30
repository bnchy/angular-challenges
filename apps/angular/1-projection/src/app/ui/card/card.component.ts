import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="custom-class flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="[card-header]"></ng-content>
      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item.firstName || item.name"
          [id]="item.id">
          <button card-list-delete-button (click)="onDelete(item.id)">
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      </section>
      <ng-content select="[card-footer]"></ng-content>
    </div>
  `,
  standalone: true,
  styles: [
    `
      .custom-class {
        background-color: var(--background-color);
      }
    `,
  ],
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Output() deleteItem = new EventEmitter<number>();

  CardType = CardType;

  onDelete(id: number) {
    this.deleteItem.emit(id);
  }
}
