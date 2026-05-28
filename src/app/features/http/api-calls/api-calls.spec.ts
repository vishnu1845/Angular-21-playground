import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCalls } from './api-calls';

describe('ApiCalls', () => {
  let component: ApiCalls;
  let fixture: ComponentFixture<ApiCalls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiCalls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiCalls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
