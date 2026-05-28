import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Migration } from './migration';

describe('Migration', () => {
  let component: Migration;
  let fixture: ComponentFixture<Migration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Migration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Migration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
