import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDynamically } from './order-dynamically';

describe('OrderDynamically', () => {
  let component: OrderDynamically;
  let fixture: ComponentFixture<OrderDynamically>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDynamically]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDynamically);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
