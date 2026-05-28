import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxBasics } from './ngrx-basics';

describe('NgrxBasics', () => {
  let component: NgrxBasics;
  let fixture: ComponentFixture<NgrxBasics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgrxBasics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxBasics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
