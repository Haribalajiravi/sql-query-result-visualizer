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
      console.error('Web workers are not supported in this environment.');
      // switch (this.query) {
      //   case 'select * from User where id=1234':
      //     this.dataSource.data = [];
      //     break;
      //   case 'select * from User where name="John"':
      //     import('./mock-data/sm-data.mock').then((x) => {
      //       if (!this.displayedColumns.length) {
      //         this.displayedColumns =
      //           x.smData && x.smData.length ? Object.keys(x.smData[0]) : [];
      //         this.paginator.length = x.smData.length;
      //         this.isQueryExecuted.emit(false);
      //       }
      //       this.dataSource.data = x.smData;
      //     });
      //     break;
      //   case 'select * from User where age > 22':
      //     import('./mock-data/md-data.mock').then((x) => {
      //       if (!this.displayedColumns.length) {
      //         this.displayedColumns =
      //           x.mdData && x.mdData.length ? Object.keys(x.mdData[0]) : [];
      //         this.paginator.length = x.mdData.length;
      //         this.isQueryExecuted.emit(false);
      //       }
      //       this.dataSource.data = x.mdData;
      //     });
      //     break;
      //   case 'select * from User where sex = "Male"':
      //     import('./mock-data/lg-data.mock').then((x) => {
      //       if (!this.displayedColumns.length) {
      //         this.displayedColumns =
      //           x.lgData && x.lgData.length ? Object.keys(x.lgData[0]) : [];
      //         this.paginator.length = x.lgData.length;
      //         this.isQueryExecuted.emit(false);
      //       }
      //       this.dataSource.data = x.lgData;
      //     });
      //     break;
      //   case 'select * from User where isCitizen = 1':
      //     import('./mock-data/xl-data.mock').then((x) => {
      //       if (!this.displayedColumns.length) {
      //         this.displayedColumns =
      //           x.xlData && x.xlData.length ? Object.keys(x.xlData[0]) : [];
      //         this.paginator.length = x.xlData.length;
      //         this.isQueryExecuted.emit(false);
      //       }
      //       this.dataSource.data = x.xlData;
      //     });
      //     break;
      // }
    }
  }

  reset() {
    this.displayedColumns = [];
    this.dataSource.data = [];
    this.paginator.length = 0;
  }
}
