import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { issellerGuard } from './isseller.guard';

describe('issellerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => issellerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
