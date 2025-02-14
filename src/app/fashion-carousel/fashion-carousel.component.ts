import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-fashion-carousel',
  templateUrl: './fashion-carousel.component.html',
  styleUrls: ['./fashion-carousel.component.css']
})
export class FashionCarouselComponent implements OnInit, OnDestroy {
  images: string[] = [
    '/assets/images/slideimg3.avif',  
    '/assets/images/slideimg2.avif',
    '/assets/images/slideimg1.avif'
  ];
  currentSlide = 0;
  private intervalId: any;

  ngOnInit() {
    this.startSlideShow();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startSlideShow() {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }, 3000);
  }

  setSlide(index: number) {
    this.currentSlide = index;
    // Reset the interval when manually changing slides
    clearInterval(this.intervalId);
    this.startSlideShow();
  }
}
