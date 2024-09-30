import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'computation', pure: true, standalone: true })
export class ComputationPipe implements PipeTransform {
  transform(value: string, index: number): string {
    return `${value} - ${index}`;
  }
}
