import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';

@NgModule({
  declarations: [AppComponent, CellComponent, KeyboardComponent],
  imports: [CoreModule, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
