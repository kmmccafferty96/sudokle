import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CellComponent } from './components/cell.component';

@NgModule({
  declarations: [AppComponent, CellComponent],
  imports: [CoreModule, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
