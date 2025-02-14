import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionCarouselComponent } from './fashion-carousel.component';

describe('FashionCarouselComponent', () => {
  let component: FashionCarouselComponent;
  let fixture: ComponentFixture<FashionCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FashionCarouselComponent]
    });
    fixture = TestBed.createComponent(FashionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
