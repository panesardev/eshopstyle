import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { computedAsync } from 'ngxtension/computed-async';
import { FEATURED_MEN, FEATURED_WOMEN } from '../../app.constants';
import { zip } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './index.component.html',
})
export default class IndexComponent {
  private platformId = inject(PLATFORM_ID);
  private productsService = inject(ProductsService);
  
  images: string[] = [
    '/assets/img/img2.jpg',
    '/assets/img/img1.jpg',
    '/assets/img/img3.jpg',
    '/assets/img/img4.jpg',
  ];

  currentImageIndex = signal(0);

  featuredMen = computedAsync(() => 
    zip(FEATURED_MEN.map(id => this.productsService.find(id))),
  );

  featuredWomen = computedAsync(() => 
    zip(FEATURED_WOMEN.map(id => this.productsService.find(id))),
  );

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.currentImageIndex.set((this.currentImageIndex() + 1) % this.images.length);
      }, 3000); // Change image every 3 seconds
    }
  }

}
