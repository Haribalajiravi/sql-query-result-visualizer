import { NgFor, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SqlResultTableComponent } from './sql-result-table.component';

@NgModule({
  declarations: [SqlResultTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTableModule,
    MatTooltipModule,
    NgFor,
    NgIf,
  ],
  exports: [SqlResultTableComponent],
})
export class SqlResultTableModule {}
