import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss'],
})
export class ResultDialogComponent {
  result = 0;

  constructor(@Inject(MAT_DIALOG_DATA) data: { result: number }, private _matDialogRef: MatDialogRef<ResultDialogComponent>) {
    this.result = data.result;
  }

  closeDialog() {
    this._matDialogRef.close();
  }
}