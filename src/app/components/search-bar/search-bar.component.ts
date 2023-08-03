import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnChanges {
  /**
   * Query search input
   */
  @Input() inputQuery?: string;

  /**
   * Holds query running state
   */
  @Input() isQueryRunning = false;

  /**
   * emits user input query
   */
  @Output() setInputQuery = new EventEmitter();

  /**
   * emits user stop signal
   */
  @Output() stopQueryEmitter = new EventEmitter();

  /**
   * Query Input element reference
   */
  @ViewChild('sqlQueryInput') sqlQueryInput: ElementRef;

  /**
   * SQL input query form controller
   */
  queryInputControl = new FormControl('', [Validators.required]);

  ngOnChanges() {
    if (this.inputQuery && this.inputQuery.length > 0) {
      this.queryInputControl.setValue(this.inputQuery ?? '');
      this.sqlQueryInput?.nativeElement?.focus();
    }
  }

  runQuery() {
    if (this.queryInputControl.valid) {
      this.setInputQuery.emit(this.queryInputControl.value);
    }
  }

  stopQuery() {
    this.stopQueryEmitter.emit();
  }
}
