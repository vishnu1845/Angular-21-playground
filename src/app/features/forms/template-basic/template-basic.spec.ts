import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateBasic } from './template-basic';

describe('TemplateBasic', () => {
  let component: TemplateBasic;
  let fixture: ComponentFixture<TemplateBasic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateBasic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateBasic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
