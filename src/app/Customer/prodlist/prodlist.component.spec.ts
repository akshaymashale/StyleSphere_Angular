import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdlistComponent } from './prodlist.component';

describe('ProdlistComponent', () => {
  let component: ProdlistComponent;
  let fixture: ComponentFixture<ProdlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdlistComponent]
    });
    fixture = TestBed.createComponent(ProdlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
