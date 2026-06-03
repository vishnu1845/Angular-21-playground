import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalFormValidation } from './signal-form-validation';

describe('SignalFormValidation', () => {
  let component: SignalFormValidation;
  let fixture: ComponentFixture<SignalFormValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormValidation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalFormValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
