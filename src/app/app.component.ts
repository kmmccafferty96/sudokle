import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaxTimesPlayedDialogComponent } from './components/max-times-played-dialog/max-times-played-dialog.component';
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

  totalTime = 60000;
  randomNumbers: { number: number; success: boolean }[] = [];
  missingNumber: number = -1;
  currentScore = 0;
  firstTry = true;
  lock = false;
  lastGuess = -1;
  displayOverlay = false;
  success = false;
  timesPlayedToday = 0;
  // animationValues = animationValues;
  // selectedAnimationValue = 'backInLeft';
  // animationSpeedValues = ['default', 'slow', 'slower', 'fast', 'faster'];
  // selectedAnimationSpeedValue = this.animationSpeedValues[4];
  animation = 'backInLeft';

  constructor(
    private _numberService: NumberService,
    private _dialogService: MatDialog,
    public storageService: StorageService,
  ) {}

  ngAfterViewInit(): void {
    this.getRandomNumbers();
    this.storageService.timesPlayedToday$.subscribe((timesPlayedToday) => {
      this.timesPlayedToday = timesPlayedToday;
    });

    this.checkCanPlayAgain();
  }

  handleKeyPress(key: number) {
    if (!this.lock) {
      this.lock = true;
      if (this.firstTry) {
        this.timer.startCountdown();
        this.storageService.incrementTimesPlayedToday();
        this.firstTry = false;
      }
      if (key === this.missingNumber) {
        this.success = true;
        this.randomNumbers[this.randomNumbers.map((rn) => rn.number).indexOf(-1)] = { number: key, success: true };
        this.currentScore++;
        this.animation = '';
        setTimeout(() => {
          this.animation = 'backInLeft';
          this.getRandomNumbers();
          this.lock = false;
        }, 250);
      } else {
        this.displayOverlay = true;
        this.success = false;
        this.animation = 'headShake';
        setTimeout(() => {
          this.displayOverlay = false;
          this.animation = 'backInLeft';
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
        if (this.checkCanPlayAgain()) {
          this.reset();
        }
      });
  }

  // handleAnimationPickerChange(event: MatSelectChange): void {
  //   this.selectedAnimationValue = event.value;
  // }

  // handleAnimationSpeedPickerChange(event: MatSelectChange): void {
  //   this.selectedAnimationSpeedValue = event.value;
  // }

  private checkCanPlayAgain(): boolean {
    if (this.timesPlayedToday === 3) {
      this._dialogService.open(MaxTimesPlayedDialogComponent, { disableClose: true });
      return false;
    }
    return true
  }

  private getRandomNumbers(rollAgainNumbers?: number[]) {
    const numberObject = this._numberService.getNumbers(rollAgainNumbers);
    this.randomNumbers = numberObject.numbers.map((num) => {
      return { number: num, success: false }
    });
    this.missingNumber = numberObject.missingNumber;
  }

  private reset() {
    this.firstTry = true;
    this.timer.resetTimeLeft();
    this.currentScore = 0;
    this.getRandomNumbers();
  }
}
