import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss'],
})
export class ResultDialogComponent {
  isHighScore = false;
  name = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { result: number; scoreToBeat: number; initials: string },
    public _matDialogRef: MatDialogRef<ResultDialogComponent>,
  ) {
    this.isHighScore = data.result > data.scoreToBeat;
    this.name = data.initials;
  }

  closeDialog() {
    this._matDialogRef.close(this.name);
  }
}
