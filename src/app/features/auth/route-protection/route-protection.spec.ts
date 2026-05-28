import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteProtection } from './route-protection';

describe('RouteProtection', () => {
  let component: RouteProtection;
  let fixture: ComponentFixture<RouteProtection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteProtection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteProtection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
