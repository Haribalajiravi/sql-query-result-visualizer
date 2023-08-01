import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlResultTableComponent } from './sql-result-table.component';

describe('SqlResultTableComponent', () => {
  let component: SqlResultTableComponent;
  let fixture: ComponentFixture<SqlResultTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SqlResultTableComponent]
    });
    fixture = TestBed.createComponent(SqlResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
