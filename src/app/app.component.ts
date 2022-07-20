import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';
import { TimerComponent } from './components/timer/timer.component';

import { NumberService } from './core/services/number.service';

@Component({
  selector: 'sud-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(TimerComponent) private timer!: TimerComponent;

  totalTime = 60000;
  randomNumbers: number[] = [];
  missingNumber: number = -1;
  currentScore = 0;
  firstTry = true;
  lock = false;
  lastGuess = -1;

  constructor(private _numberService: NumberService, private _dialogService: MatDialog) {}

  ngAfterViewInit(): void {
    this.getRandomNumbers();
  }

  handleKeyPress(key: number) {
    if (!this.lock) {
      if (this.firstTry) {
        this.timer.startCountdown();
        this.firstTry = false;
      }
      if (key === this.missingNumber) {
        this.lock = true;
        this.randomNumbers[this.randomNumbers.indexOf(-1)] = key;
        this.currentScore++;
        setTimeout(() => {
          this.getRandomNumbers();
          this.lock = false;
        }, 1000);
      } else {
        this.getRandomNumbers([this.lastGuess, key]);
      }
      this.lastGuess = key;
    }
  }

  handleTimerFinished() {
    this._dialogService
    .open(ResultDialogComponent, {
      data: { result: this.currentScore },
      disableClose: true,
      width: '80%',
      height: '40%',
    })
    .afterClosed()
    .subscribe(() => {
      this.reset();
    });
  }

  private getRandomNumbers(rollAgainNumbers?: number[]) {
    const numberObject = this._numberService.getNumbers(rollAgainNumbers);
    this.randomNumbers = numberObject.numbers;
    this.missingNumber = numberObject.missingNumber;
  }

  private reset() {
    this.currentScore = 0;
    this.getRandomNumbers();
    this.timer.startCountdown();
  }
}
