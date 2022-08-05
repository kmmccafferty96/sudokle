import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const HIGH_SCORE_KEY = 'SUD_HIGH_SCORE';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _highScoreSub = new BehaviorSubject<number>(0);

  highScore$ = this._highScoreSub.asObservable();

  constructor() {
    this._highScoreSub.next(this.getHighScore());
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

  private getHighScore(): number {
    return parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0');
  }
}
