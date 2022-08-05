import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss'],
})
export class ResultDialogComponent {
  result = 0;
  previousHighScore = 0;
  isHighScore = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: { result: number, previousHighScore: number }, private _matDialogRef: MatDialogRef<ResultDialogComponent>) {
    this.result = data.result;
    this.previousHighScore = data.previousHighScore;
    this.isHighScore = data.result > data.previousHighScore;
  }

  closeDialog() {
    this._matDialogRef.close();
  }
}
