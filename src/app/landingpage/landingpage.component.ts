import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  images: string[] = [
    'D:\StyleShpere\StyleSphere_Angular\src\assets\Images\OP.jpg',
    'path/to/image2.jpg',
    'path/to/image3.jpg'
  ];
  
  currentSlide = 0;
  private intervalId: any;

  ngOnInit() {
    this.startSlideshow();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startSlideshow() {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }, 3000);
  }

  setSlide(index: number) {
    this.currentSlide = index;
    // Reset the interval when manually changing slides
    clearInterval(this.intervalId);
    this.startSlideshow();
  }
}
