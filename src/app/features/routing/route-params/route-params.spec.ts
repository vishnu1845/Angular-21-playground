import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteParams } from './route-params';

describe('RouteParams', () => {
  let component: RouteParams;
  let fixture: ComponentFixture<RouteParams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteParams]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteParams);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
