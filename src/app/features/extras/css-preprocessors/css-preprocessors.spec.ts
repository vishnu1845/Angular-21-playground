import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssPreprocessors } from './css-preprocessors';

describe('CssPreprocessors', () => {
  let component: CssPreprocessors;
  let fixture: ComponentFixture<CssPreprocessors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssPreprocessors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssPreprocessors);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
