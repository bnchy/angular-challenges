/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
  styles: [
    `
      :host-context(.warning) {
        --text-font-size: 25px;
        --text-color: orange;
      }
      :host-context(.error) {
        --text-font-size: 30px;
        --text-color: red;
      }
    `,
  ],
})
export class TextStaticComponent {}
