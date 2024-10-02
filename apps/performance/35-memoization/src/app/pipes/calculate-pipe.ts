import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'calculate', pure: true, standalone: true })
export class CalculatePipe implements PipeTransform {
  transform(value: number) {
    return this.fibonacci(value);
  }

  private fibonacci(num: number): number {
    if (num === 1 || num === 2) {
      return 1;
    }
    return this.fibonacci(num - 1) + this.fibonacci(num - 2);
  }
}
