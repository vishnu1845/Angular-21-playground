import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterial } from './angular-material';

describe('AngularMaterial', () => {
  let component: AngularMaterial;
  let fixture: ComponentFixture<AngularMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularMaterial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
