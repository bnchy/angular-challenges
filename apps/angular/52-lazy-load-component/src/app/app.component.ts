import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen bg-gray-500">
      @defer (on interaction(buttonForTopBar)) {
        <app-top />
      } @placeholder {
        <app-placeholder />
        <button
          #buttonForTopBar
          class="rounded-sm border border-blue-500 bg-blue-300 p-2">
          Load Top
        </button>
      } @error {
        <span>oops something went wrong in the application</span>
      }
    </div>
  `,
})
export class AppComponent {}
