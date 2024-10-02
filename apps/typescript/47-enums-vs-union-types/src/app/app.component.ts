import { Component, computed, signal } from '@angular/core';

type Difficulty = 'easy' | 'normal';

const Directions = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

type Direction = (typeof Directions)[keyof typeof Directions];

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  template: `
    <section>
      <div>
        <button mat-stroked-button (click)="difficulty.set('easy')">
          Easy
        </button>
        <button mat-stroked-button (click)="difficulty.set('normal')">
          Normal
        </button>
      </div>
      <p>Selected Difficulty: {{ difficultyLabel() }}</p>
    </section>

    <section>
      <div>
        <button mat-stroked-button (click)="direction.set(Directions.LEFT)">
          Left
        </button>
        <button mat-stroked-button (click)="direction.set(Directions.RIGHT)">
          Right
        </button>
      </div>
      <p>{{ directionLabel() }}</p>
    </section>
  `,
  styles: `
    section {
      @apply mx-auto my-5 flex w-fit flex-col items-center gap-2;

      > div {
        @apply flex w-fit gap-5;
      }
    }

    button {
      @apply rounded-md border px-4 py-2;
    }
  `,
})
export class AppComponent {
  readonly difficulty = signal<Difficulty>('easy');

  readonly Directions = Directions;
  readonly direction = signal<Direction | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => {
    switch (this.difficulty()) {
      case 'easy':
        return 'easy';
      case 'normal':
        return 'normal';
    }
  });

  readonly directionLabel = computed<string>(() => {
    const prefix = 'You chose to go';
    switch (this.direction()) {
      case 'left':
        return `${prefix} ${Directions.LEFT}`;
      case 'right':
        return `${prefix} ${Directions.RIGHT}`;
      default:
        return 'Choose a direction!';
    }
  });
}
