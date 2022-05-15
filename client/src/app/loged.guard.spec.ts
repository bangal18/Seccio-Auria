import { TestBed } from '@angular/core/testing';

import { LogedGuard } from './loged.guard';

describe('LogedGuard', () => {
  let guard: LogedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
