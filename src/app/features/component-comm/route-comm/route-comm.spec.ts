import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteComm } from './route-comm';

describe('RouteComm', () => {
  let component: RouteComm;
  let fixture: ComponentFixture<RouteComm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteComm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteComm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
