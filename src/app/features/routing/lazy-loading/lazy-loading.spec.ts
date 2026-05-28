import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoading } from './lazy-loading';

describe('LazyLoading', () => {
  let component: LazyLoading;
  let fixture: ComponentFixture<LazyLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
