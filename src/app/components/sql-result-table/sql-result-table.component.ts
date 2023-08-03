import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export enum ActionType {
  RUN,
  STOP,
}

@Component({
  selector: 'app-sql-result-table',
  templateUrl: './sql-result-table.component.html',
})
export class SqlResultTableComponent implements OnChanges {
  /**
   * SQL query
   */
  @Input() query: string;

  /**
   * Hold query stop flag
   */
  @Input() action: ActionType;

  /**
   * Query execution emitter
   */
  @Output() isQueryExecuted = new EventEmitter(false);

  /**
   * Contains table column names
   */
  displayedColumns: string[] = [];

  /**
   * Table data holder
   */
  dataSource = new MatTableDataSource();

  /**
   * Data paginator
   */
  @ViewChild('paginator') paginator: MatPaginator;

  /**
   * Individual worker thread to handle huge dataset
   */
  worker: Worker;

  ngOnChanges() {
    if (this.action === ActionType.STOP) {
      this.worker.terminate();
      this.isQueryExecuted.emit(false);
    } else if (
      this.action === ActionType.RUN &&
      this.query &&
      this.query.length > 0
    ) {
      this.reset();
      this.initWorker();
      this.worker.postMessage({
        query: this.query,
        pageSize: this.paginator.pageSize,
        pageNumber: this.paginator.pageIndex + 1,
      });
    }
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() =>
      this.worker.postMessage({
        query: this.query,
        pageSize: this.paginator.pageSize,
        pageNumber: this.paginator.pageIndex + 1,
      })
    );
  }

  /**
   * Inits worker and listen to the data to update the table
   */
  initWorker() {
    if (typeof Worker !== 'undefined') {
      this.isQueryExecuted.emit(true);
      this.worker = new Worker(
        new URL('./sql-result-table.worker', import.meta.url)
      );
      this.worker.onmessage = ({ data: { data, totalCount } }) => {
        // update only for first time when we get desired column details and data count
        if (!this.displayedColumns.length) {
          this.displayedColumns =
            data && data.length ? Object.keys(data[0]) : [];
          this.paginator.length = totalCount ?? 0;
          this.isQueryExecuted.emit(false);
        }
        this.dataSource.data = data ?? [];
      };
    } else {
      // We can handle fallback operation here if no web worker support.
      // In this modern browser era all the browser have worker.
      // I haven't handling fallback here since it makes no sense without real time API
      console.error('Web workers are not supported in this environment.');
    }
  }

  reset() {
    this.displayedColumns = [];
    this.dataSource.data = [];
    this.paginator.length = 0;
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
  }
}
