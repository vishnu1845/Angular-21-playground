import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRouting } from './basic-routing';

describe('BasicRouting', () => {
  let component: BasicRouting;
  let fixture: ComponentFixture<BasicRouting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicRouting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicRouting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
