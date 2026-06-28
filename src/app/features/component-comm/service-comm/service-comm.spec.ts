import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceComm } from './service-comm';

describe('ServiceComm', () => {
  let component: ServiceComm;
  let fixture: ComponentFixture<ServiceComm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceComm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceComm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
