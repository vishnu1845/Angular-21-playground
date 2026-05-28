import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalInputs } from './signal-inputs';

describe('SignalInputs', () => {
  let component: SignalInputs;
  let fixture: ComponentFixture<SignalInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalInputs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalInputs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
