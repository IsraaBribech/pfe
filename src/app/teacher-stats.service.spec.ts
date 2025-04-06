import { TestBed } from '@angular/core/testing';

import { TeacherStatsService } from './teacher-stats.service';

describe('TeacherStatsService', () => {
  let service: TeacherStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
