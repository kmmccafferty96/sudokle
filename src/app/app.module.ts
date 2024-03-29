import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';
import { TimerComponent } from './components/timer/timer.component';
import { MaxTimesPlayedDialogComponent } from './components/max-times-played-dialog/max-times-played-dialog.component';
import { LeaderboardDialog } from './components/leaderboard-dialog/leaderboard-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    KeyboardComponent,
    ResultDialogComponent,
    TimerComponent,
    MaxTimesPlayedDialogComponent,
    LeaderboardDialog,
  ],
  imports: [CoreModule, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
