import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateValidation } from './template-validation';

describe('TemplateValidation', () => {
  let component: TemplateValidation;
  let fixture: ComponentFixture<TemplateValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateValidation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
