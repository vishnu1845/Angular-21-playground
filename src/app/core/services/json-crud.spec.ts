import { TestBed } from '@angular/core/testing';

import { JsonCrud } from './json-crud';

describe('JsonCrud', () => {
  let service: JsonCrud;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonCrud);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
