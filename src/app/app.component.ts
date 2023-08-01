import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
   * Sets
   * @param query user entering sql query
   */
  setInputQuery(query: string) {
    this.inputQuery = query;
  }
}
