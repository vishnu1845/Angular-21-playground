import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureStructure } from './feature-structure';

describe('FeatureStructure', () => {
  let component: FeatureStructure;
  let fixture: ComponentFixture<FeatureStructure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureStructure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureStructure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
