import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ActionType } from './components/sql-result-table/sql-result-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /**
   * Selected Sample Query
   */
  selectedQuery = 'select * from User where name="John"';

  /**
   * User entering query
   */
  inputQuery: string;

  /**
   * Whether query in running state
   */
  isQueryRunning = false;

  /**
   * Query action type
   */
  action: ActionType;

  /**
   * List of sample queries
   */
  sampleQueries = [
    {
      query: 'select * from User where id=1234',
      label: 'No data',
    },
    {
      query: 'select * from User where name="John"',
      label: '10k',
    },
    {
      query: 'select * from User where age > 22',
      label: '100k',
    },
    {
      query: 'select * from User where sex = "Male"',
      label: '1 Million',
    },
    {
      query: 'select * from User where isCitizen = 1',
      label: '10 Million',
    },
  ];

  /**
   * Sets input query
   */
  setInputQuery(query: string) {
    this.inputQuery = query;
    this.action = ActionType.RUN;
  }

  /**
   * Stops executing query
   */
  stopQuery() {
    this.action = ActionType.STOP;
  }

  /**
   * Sets SQL results loaded flag
   */
  isQueryExecuted(isRunning: boolean) {
    this.isQueryRunning = isRunning;
  }
}
