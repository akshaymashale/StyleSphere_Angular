import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { iscustomerGuard } from './iscustomer.guard';

describe('iscustomerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => iscustomerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
