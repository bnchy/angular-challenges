import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      customClass="bg-light-blue"
      (deleteItem)="delete($event)">
      <img card-header src="assets/img/city.png" width="200px" />
      <button
        card-footer
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      :host {
        --background-color: lightblue;
      }
    `,
  ],
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.cities$.subscribe((c) => {
      this.cities = c;
      this.cities.forEach((city) => console.log(`${city.name}`));
    });
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }
  delete(id: number) {
    this.store.deleteOne(id);
  }
}
