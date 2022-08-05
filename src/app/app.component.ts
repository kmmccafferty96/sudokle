import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';
import { TimerComponent } from './components/timer/timer.component';

import { NumberService } from './core/services/number.service';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'sud-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(TimerComponent) private timer!: TimerComponent;

  totalTime = 10000;
  randomNumbers: number[] = [];
  missingNumber: number = -1;
  currentScore = 0;
  firstTry = true;
  lock = false;
  lastGuess = -1;
  displayOverlay = false;
  success = false;

  constructor(private _numberService: NumberService, private _dialogService: MatDialog, public storageService: StorageService) {}

  ngAfterViewInit(): void {
    this.getRandomNumbers();
  }

  handleKeyPress(key: number) {
    if (!this.lock) {
      this.displayOverlay = true;
      this.lock = true;
      if (this.firstTry) {
        this.timer.startCountdown();
        this.firstTry = false;
      }
      if (key === this.missingNumber) {
        this.success = true;
        this.randomNumbers[this.randomNumbers.indexOf(-1)] = key;
        this.currentScore++;
        setTimeout(() => {
          this.displayOverlay = false;
          this.getRandomNumbers();
          this.lock = false;
        }, 500);
      } else {
        this.success = false;
        setTimeout(() => {
          this.displayOverlay = false;
          this.getRandomNumbers([this.lastGuess, key]);
          this.lock = false;
        }, 1000);
      }
      this.lastGuess = key;
    }
  }

  handleTimerFinished() {
    const previousHighScore = this.storageService.setScore(this.currentScore);
    this._dialogService
    .open(ResultDialogComponent, {
      data: { result: this.currentScore, previousHighScore },
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
    this.firstTry = true;
    this.timer.resetTimeLeft();
    this.currentScore = 0;
    this.getRandomNumbers();
  }
}
