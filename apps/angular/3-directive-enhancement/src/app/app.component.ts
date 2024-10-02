import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgForEmptyDirective } from '../directives/ngForEmpty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForEmptyDirective],
  selector: 'app-root',
  template: `
    <div
      *ngFor="
        let person of persons();
        empty: emptyList;
        template: itemTemplate
      ">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
    <ng-template #itemTemplate let-person>
      <div>{{ person.name }}</div>
    </ng-template>
    <button (click)="addPerson()">Add</button>
    <button (click)="clearPersons()">Clear</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons = signal<Person[]>([]); // Using a signal to manage the list

  addPerson() {
    // Update the signal to add a new person
    this.persons.update((current) => [
      ...current,
      { name: 'toto' + (current.length + 1) },
    ]);
  }

  clearPersons(): void {
    // Set the persons signal to an empty array
    this.persons.set([]);
  }
}
