import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputCard } from './output-card';

describe('OutputCard', () => {
  let component: OutputCard;
  let fixture: ComponentFixture<OutputCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
