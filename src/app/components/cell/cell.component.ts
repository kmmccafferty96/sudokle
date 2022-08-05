import { Component, Input } from '@angular/core';

@Component({
  selector: 'sud-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  @Input() number: number = -1;
  @Input() success: boolean = false;
}
