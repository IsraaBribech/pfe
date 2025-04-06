import { TestBed } from '@angular/core/testing';

import { StatensService } from './statens.service';

describe('StatensService', () => {
  let service: StatensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
