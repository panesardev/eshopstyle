import { Component } from '@angular/core';
import { Modal } from '../../types/modal.class';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BaseModalComponent } from './base-modal.component';
import { BRAND } from '../../app.constants';

@Component({
  selector: 'app-nav-modal',
  standalone: true,
  imports: [
    BaseModalComponent,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <app-base-modal classes="h-full">
      <div class="grid grid-cols-3 items-center mb-4">
        <div></div>
        <h1 routerLink="/" class="text-2xl text-center lobster">{{ brand }}</h1>
        <div>
          <button class="bg-primary text-white ml-auto py-1 px-3 rounded-full" (click)="modal.close()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="h-0 border-[1px] border-base-300 rounded-full mb-8"></div>
      <div class="grid gap-4 text-center text-lg" (click)="modal.close()">
        <a class="hover:underline" routerLinkActive="text-primary" routerLink="/products">Products</a>
        <a class="hover:underline" routerLinkActive="text-primary" routerLink="/about">About</a>
        <a class="hover:underline" routerLinkActive="text-primary" routerLink="/checkout">Checkout</a>
        <a class="hover:underline" routerLinkActive="text-primary" routerLink="/login">Login</a>
      </div>
    </app-base-modal>
  `,  
})
export class NavModalComponent extends Modal {

  brand = BRAND;

}
