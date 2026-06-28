import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChild } from './view-child';

describe('ViewChild', () => {
  let component: ViewChild;
  let fixture: ComponentFixture<ViewChild>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChild]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChild);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
