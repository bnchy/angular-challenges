import { NgFor } from '@angular/common';
import {
  Directive,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngFor][ngForOf]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgFor,
      inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
    },
  ],
})
export class NgForEmptyDirective<T, U> implements OnChanges {
  private viewContainer = inject(ViewContainerRef);
  @Input() ngForOf!: T[];
  @Input() ngForEmpty!: TemplateRef<U>;
  @Input() ngForTemplate!: TemplateRef<any>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ngForOf']) {
      this.updateView();
    }
  }

  private updateView(): void {
    this.viewContainer.clear();

    if (this.ngForOf && this.ngForOf.length > 0) {
      this.ngForOf.forEach((item) => {
        this.viewContainer.createEmbeddedView(this.ngForTemplate, {
          $implicit: item,
        });
      });
    } else if (this.ngForEmpty) {
      this.viewContainer.createEmbeddedView(this.ngForEmpty);
    }
  }
}
