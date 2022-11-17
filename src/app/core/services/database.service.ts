import { Injectable } from '@angular/core';
import { child, Database, get, ref, set } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private _highScoreSub = new BehaviorSubject<HighScore>({ username: '', score: 0 });
  private readonly highScorePath = 'high-score';

  highScore$ = this._highScoreSub.asObservable();

  constructor(private _database: Database) {
    this.getHighScore();
  }

  postScore(highScore: HighScore): HighScore {
    if (highScore.score > this._highScoreSub.value.score) {
      this._highScoreSub.next(highScore);
      set(ref(this._database, this.highScorePath), { highScore });
    }

    return this._highScoreSub.value;
  }

  async getHighScore(): Promise<void> {
    let result: HighScore = { username: 'none', score: 0 };

    try {
      const highScoreRef = ref(this._database);
      const snapshot = await get(child(highScoreRef, this.highScorePath));
      if (snapshot.exists()) {
        console.log(snapshot);
        result = snapshot.val().highScore;
      }
    } catch (error) {
      console.log(error);
    }

    this._highScoreSub.next(result);
  }
}

interface HighScore {
  username: string;
  score: number;
}
