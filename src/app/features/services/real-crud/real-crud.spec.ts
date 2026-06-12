import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealCrud } from './real-crud';

describe('RealCrud', () => {
  let component: RealCrud;
  let fixture: ComponentFixture<RealCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
