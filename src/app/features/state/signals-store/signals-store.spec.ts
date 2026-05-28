import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsStore } from './signals-store';

describe('SignalsStore', () => {
  let component: SignalsStore;
  let fixture: ComponentFixture<SignalsStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
