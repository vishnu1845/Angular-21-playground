import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveBasic } from './reactive-basic';

describe('ReactiveBasic', () => {
  let component: ReactiveBasic;
  let fixture: ComponentFixture<ReactiveBasic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveBasic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveBasic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
