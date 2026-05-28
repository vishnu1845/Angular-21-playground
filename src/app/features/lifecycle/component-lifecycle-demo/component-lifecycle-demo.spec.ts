import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLifecycleDemo } from './component-lifecycle-demo';

describe('ComponentLifecycleDemo', () => {
  let component: ComponentLifecycleDemo;
  let fixture: ComponentFixture<ComponentLifecycleDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentLifecycleDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentLifecycleDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
