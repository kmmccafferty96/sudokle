import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';

import { NumberService } from './core/services/number.service';

@Component({
  selector: 'sud-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentCountDownDate: any;
  currentInterval: any;
  randomNumbers: number[] = [];
  missingNumber: number = -1;
  timeLeft: string = '';
  currentScore = 0;
  firstTry = true;

  constructor(private _numberService: NumberService, private _dialogService: MatDialog) {
    this.reset();
    this.getRandomNumbers();
  }

  getRandomNumbers() {
    const numberObject = this._numberService.getNumbers();
    this.randomNumbers = numberObject.numbers;
    this.missingNumber = numberObject.missingNumber;
  }

  startCountdown() {
    clearInterval(this.currentInterval);
    // Set the date we're counting down to
    this.currentCountDownDate = new Date(new Date().getTime() + 61000);

    // Update the count down every 1 second
    this.currentInterval = setInterval( () => {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = this.currentCountDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      this.timeLeft = `${minutes !== -1 ? minutes : 0}:${seconds < 10 ? '0' : ''}${seconds !== -1 ? seconds : 0}`;

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(this.currentInterval);

        this._dialogService.open(ResultDialogComponent, { data: { result: this.currentScore }, disableClose: true }).afterClosed().subscribe(() => {
          this.reset();
        });
      }
    }, 100);
  }

  handleKeyPress(key: number) {
    if (this.firstTry) {
      this.startCountdown();
      this.firstTry = false;
    }
    if (key === this.missingNumber) {
      this.randomNumbers[this.randomNumbers.indexOf(-1)] = key;
      this.currentScore++;
      setTimeout(() => {
        this.getRandomNumbers();
      }, 1000);
    } else {
      this.getRandomNumbers();
    }
  }

  private reset() {
    this.currentScore = 0;
    this.getRandomNumbers();
    this.firstTry = true;
    this.timeLeft = '1:00';
  }
}
