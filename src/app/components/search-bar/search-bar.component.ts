import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnChanges {
  /**
   * Query search input
   */
  @Input() inputQuery?: string;

  /**
   * emits user input query
   */
  @Output() setInputQuery = new EventEmitter();

  @ViewChild("sqlQueryInput") sqlQueryInput: ElementRef;

  /**
   * SQL input query form controller
   */
  queryInputControl = new FormControl('', [Validators.required]);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputQuery'].currentValue !== changes['inputQuery'].previousValue) {
      this.queryInputControl.setValue(this.inputQuery ?? '');
      this.sqlQueryInput.nativeElement.focus();
    }
  }

  submit() {
    if (this.queryInputControl.valid) {
      this.setInputQuery.emit(this.queryInputControl.value);
    }
  }
}
