import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_MEN, FEATURED_WOMEN } from '../../app.constants';
import { zip } from 'rxjs';
import { ProductsService } from '../../domains/products/products.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './index.component.html',
})
export class IndexComponent {
  private platformId = inject(PLATFORM_ID);
  private productsService = inject(ProductsService);
  
  images: string[] = [
    '/img/img2.jpg',
    '/img/img1.jpg',
    '/img/img3.jpg',
    '/img/img4.jpg',
  ];

  currentImageIndex = signal(0);

  featuredMen = toSignal(
    zip(FEATURED_MEN.map(id => this.productsService.find(id))),
  );

  featuredWomen = toSignal(
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
