import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotocartComponent } from './gotocart.component';

describe('GotocartComponent', () => {
  let component: GotocartComponent;
  let fixture: ComponentFixture<GotocartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GotocartComponent]
    });
    fixture = TestBed.createComponent(GotocartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
