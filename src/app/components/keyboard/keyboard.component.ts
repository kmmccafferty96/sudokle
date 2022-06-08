import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sud-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent {
  @Output() keyPress = new EventEmitter<number>();

  /** 9 keys (1-9) */
  keys = Array.from(Array(10).keys()).slice(1);

  handleKeyPress(key: number): void {
    this.keyPress.emit(key);
  }
}
