import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-sql-result-table',
  templateUrl: './sql-result-table.component.html',
  styleUrls: ['./sql-result-table.component.scss'],
})
export class SqlResultTableComponent implements OnChanges {
  /**
   * SQL query
   */
  @Input() query: string;

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

  /**
   * Holds data loading flag
   */
  isLoading = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['query'].currentValue !== changes['query'].previousValue) {
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
    this.initWorker();
    this.paginator.page.pipe(startWith({})).subscribe(() =>
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
      this.isLoading = true;
      this.worker = new Worker(
        new URL('./sql-result-table.worker', import.meta.url)
      );
      this.worker.onmessage = ({ data: { data, totalCount } }) => {
        // update only for first time when we get desired column details and data count
        if (!this.displayedColumns.length) {
          this.displayedColumns =
            data && data.length ? Object.keys(data[0]) : [];
          this.paginator.length = totalCount ?? 0;
          this.isLoading = false;
        }
        this.dataSource.data = data ?? [];
      };
    } else {
      console.error('Web workers are not supported in this environment.');
    }
  }

  reset() {
    this.displayedColumns = [];
    this.dataSource.data = [];
    this.paginator.length = 0;
  }
}
