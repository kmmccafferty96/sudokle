import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NumberService {
  /**
   * Randomizes numbers between 1 and 9 with one number missing.
   * -1 will be in place of the missing number.
   */
  getNumbers(): number[] {
    let numbers = [];
    for (let i = 1; i <= 9; i++) {
      numbers.push(i);
    }

    numbers = this.shuffle(numbers);

    numbers[this.getRandomNumber()] = -1;

    return numbers;
  }

  private shuffle(numbers: number[]): number[] {
    let currentIndex = numbers.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [numbers[currentIndex], numbers[randomIndex]] = [numbers[randomIndex], numbers[currentIndex]];
    }

    return numbers;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * 9);
  }
}