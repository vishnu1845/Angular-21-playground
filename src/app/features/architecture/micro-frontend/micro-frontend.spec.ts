import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroFrontend } from './micro-frontend';

describe('MicroFrontend', () => {
  let component: MicroFrontend;
  let fixture: ComponentFixture<MicroFrontend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicroFrontend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroFrontend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
