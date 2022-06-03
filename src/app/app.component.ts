import { Component } from '@angular/core';
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
  timeLeft: string = '1:00';

  constructor(private _numberService: NumberService) {
    this.getRandomNumbers();
  }

  getRandomNumbers() {
    this.randomNumbers = this._numberService.getNumbers();
    this.startCountdown();
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
      this.timeLeft = `${minutes}:${seconds || '00'}`;

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(this.currentInterval);
        //document.getElementById('demo').innerHTML = 'EXPIRED';
      }
    }, 200);
  }
}
