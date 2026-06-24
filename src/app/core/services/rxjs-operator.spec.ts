import { TestBed } from '@angular/core/testing';

import { RxjsOperator } from './rxjs-operator';

describe('RxjsOperator', () => {
  let service: RxjsOperator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxjsOperator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
