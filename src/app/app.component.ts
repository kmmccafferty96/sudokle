import { Component } from '@angular/core';
import { NumberService } from './core/services/number.service';

@Component({
  selector: 'sud-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  randomNumbers: number[] = [];

  constructor(private _numberService: NumberService) {}

  getRandomNumbers() {
    this.randomNumbers = this._numberService.getNumbers();
  }
}
