import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyInjection } from './dependency-injection';

describe('DependencyInjection', () => {
  let component: DependencyInjection;
  let fixture: ComponentFixture<DependencyInjection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependencyInjection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependencyInjection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
