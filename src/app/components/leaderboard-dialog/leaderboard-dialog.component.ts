import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  templateUrl: './leaderboard-dialog.component.html',
  styleUrls: ['./leaderboard-dialog.component.scss'],
})
export class LeaderboardDialog {
  highScores: any = [];

  constructor(private _databaseService: DatabaseService, public _matDialogRef: MatDialogRef<LeaderboardDialog>) {
    this.buildLeaderboard();
  }

  async buildLeaderboard() {
    this.highScores = await this._databaseService.getTopFiveHighScores();
  }

  closeDialog() {
    this._matDialogRef.close();
  }
}
