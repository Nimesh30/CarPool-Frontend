import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedJobs } from './searched-jobs';

describe('SearchedJobs', () => {
  let component: SearchedJobs;
  let fixture: ComponentFixture<SearchedJobs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchedJobs],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchedJobs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
