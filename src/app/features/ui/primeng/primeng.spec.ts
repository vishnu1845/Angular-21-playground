import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Primeng } from './primeng';

describe('Primeng', () => {
  let component: Primeng;
  let fixture: ComponentFixture<Primeng>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Primeng]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Primeng);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
