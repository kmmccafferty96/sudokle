import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sud-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  @Input() totalTime: number = 60000;
  @Output() timerFinished = new EventEmitter<void>();

  timeLeft: string = '1:00';
  currentCountDownDate: any;
  currentInterval: any;

  startCountdown() {
    clearInterval(this.currentInterval);
    // Set the date we're counting down to
    this.currentCountDownDate = new Date(new Date().getTime() + this.totalTime);

    // Update the count down every 1 second
    this.currentInterval = setInterval(() => {
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

      if (distance < 0) {
        clearInterval(this.currentInterval);
        this.timerFinished.emit();
      }
    }, 100);
  }
}
