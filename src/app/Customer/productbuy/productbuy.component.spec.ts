import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbuyComponent } from './productbuy.component';

describe('ProductbuyComponent', () => {
  let component: ProductbuyComponent;
  let fixture: ComponentFixture<ProductbuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductbuyComponent]
    });
    fixture = TestBed.createComponent(ProductbuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
