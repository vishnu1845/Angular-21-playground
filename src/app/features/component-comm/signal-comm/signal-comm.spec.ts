import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalComm } from './signal-comm';

describe('SignalComm', () => {
  let component: SignalComm;
  let fixture: ComponentFixture<SignalComm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalComm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalComm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
