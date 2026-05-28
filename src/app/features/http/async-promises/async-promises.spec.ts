import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncPromises } from './async-promises';

describe('AsyncPromises', () => {
  let component: AsyncPromises;
  let fixture: ComponentFixture<AsyncPromises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncPromises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsyncPromises);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
