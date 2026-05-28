import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStream } from './api-stream';

describe('ApiStream', () => {
  let component: ApiStream;
  let fixture: ComponentFixture<ApiStream>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiStream]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiStream);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
