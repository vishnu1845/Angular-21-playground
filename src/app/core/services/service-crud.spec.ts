import { TestBed } from '@angular/core/testing';

import { ServiceCrud } from './service-crud';

describe('ServiceCrud', () => {
  let service: ServiceCrud;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCrud);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
