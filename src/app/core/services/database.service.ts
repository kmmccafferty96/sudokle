import { Injectable } from '@angular/core';
import { child, Database, get, ref, set } from '@angular/fire/database';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private readonly highScorePath = 'scores';

  constructor(private _database: Database) {}

  postScore(highScore: HighScore): void {
    const key = uuid();
    set(ref(this._database, this.highScorePath + '/' + key), { ...highScore });
  }

  async getTopFiveHighScores(): Promise<HighScore[]> {
    let result: HighScore[] = [{ username: 'none', score: 0 }];

    try {
      const highScoreRef = ref(this._database);
      const snapshot = await get(child(highScoreRef, this.highScorePath));
      if (snapshot.exists()) {
        const value = snapshot.val();
        if (Object.keys(value).length > 0) {
          result = [];
        }
        Object.keys(value).forEach((key) => {
          result = result.concat([value[key]]);
        });
      }
    } catch (error) {
      console.error(error);
    }

    return result.sort(({ score: a }, { score: b }) => b - a).slice(0, 5);
  }
}

interface HighScore {
  username: string;
  score: number;
}
