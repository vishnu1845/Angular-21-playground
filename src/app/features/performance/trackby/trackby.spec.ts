import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trackby } from './trackby';

describe('Trackby', () => {
  let component: Trackby;
  let fixture: ComponentFixture<Trackby>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trackby]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trackby);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
