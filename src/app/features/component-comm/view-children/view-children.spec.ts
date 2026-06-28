import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChildren } from './view-children';

describe('ViewChildren', () => {
  let component: ViewChildren;
  let fixture: ComponentFixture<ViewChildren>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChildren]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChildren);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
