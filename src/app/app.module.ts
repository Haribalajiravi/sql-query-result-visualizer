import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchBarModule } from './components/search-bar';
import { SqlResultTableModule } from './components/sql-result-table/sql-result-table.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTooltipModule,
    SearchBarModule,
    SqlResultTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
