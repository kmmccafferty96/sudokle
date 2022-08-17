import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const HIGH_SCORE_KEY = 'SUD_HIGH_SCORE';
const TIMES_PLAYED_KEY = 'SUD_TIMES_PLAYED';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _highScoreSub = new BehaviorSubject<number>(0);
  private _timesPlayedTodaySub = new BehaviorSubject<number>(0);

  highScore$ = this._highScoreSub.asObservable();
  timesPlayedToday$ = this._timesPlayedTodaySub.asObservable();

  constructor() {
    this._highScoreSub.next(this.getHighScore());
    this._timesPlayedTodaySub.next(this.getTimesPlayedToday());

    // Add ?reset=true to url to reset times played
    if (location.search.includes('reset=true')) {
      this.resetTimesPlayed();
    }
  }

  /**
   * Sets a new high score if it is one.
   * @param score
   * @returns previous high score.
   */
  setScore(score: number): number {
    const currentHighScore = this.getHighScore();
    if (score > currentHighScore) {
      localStorage.setItem(HIGH_SCORE_KEY, score.toString());
      this._highScoreSub.next(score);
    }

    return currentHighScore;
  }

  incrementTimesPlayedToday(): void {
    const newTimesPlayed = this._timesPlayedTodaySub.value + 1;
    localStorage.setItem(TIMES_PLAYED_KEY, `${this.getCurrentDateString()}-${newTimesPlayed}`);
    this._timesPlayedTodaySub.next(newTimesPlayed);
  }

  private getHighScore(): number {
    return parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0');
  }

  private getTimesPlayedToday(): number {
    const storedDateAndTimesPlayedString = localStorage.getItem(TIMES_PLAYED_KEY);

    if (!storedDateAndTimesPlayedString) {
      return 0;
    }

    const storedDateString = storedDateAndTimesPlayedString.substring(0, storedDateAndTimesPlayedString.indexOf('-'));
    if (storedDateString === this.getCurrentDateString()) {
      const timesPlayed = parseInt(storedDateAndTimesPlayedString.replace(`${storedDateString}-`, ''));
      return timesPlayed;
    }

    return 0;
  }

  private getCurrentDateString(): string {
    const currentDate = new Date();
    return `${currentDate.getMonth()}${currentDate.getDate()}${currentDate.getFullYear()}`;
  }

  private resetTimesPlayed(): void {
    localStorage.setItem(TIMES_PLAYED_KEY, '');
    this._timesPlayedTodaySub.next(0);
  }
}
