import { Injectable, ViewContainerRef, signal } from '@angular/core';
import { Modal } from '../types/modal.class';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private containerRef: ViewContainerRef;
  readonly isClosed = signal(true);

  setContainerRef(containerRef: ViewContainerRef): void {
    this.containerRef = containerRef;
  }

  open(modal: typeof Modal): void {
    if (this.containerRef) {
      this.containerRef.clear();
      this.containerRef.createComponent(modal);
      this.isClosed.set(false);
    }
  }

  close(): void {
    setTimeout(() => {
      this.containerRef.remove();
    }, 250);
    this.isClosed.set(true);
  }  
}