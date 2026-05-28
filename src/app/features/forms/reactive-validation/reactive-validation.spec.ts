import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveValidation } from './reactive-validation';

describe('ReactiveValidation', () => {
  let component: ReactiveValidation;
  let fixture: ComponentFixture<ReactiveValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveValidation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
