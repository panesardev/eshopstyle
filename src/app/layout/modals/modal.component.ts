import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';
import { Modal } from './modal.class';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  template: `
    <div class="{{ modal.isOpen() ? 'modal-overlay-open' : 'modal-overlay-close' }} fixed inset-0 z-[100] bg-slate-950/60"></div>
    <div class="{{ modal.isOpen() ? 'modal-open' : 'modal-close' }} fixed z-[101] inset-0 px-3 md:px-10 py-8" #modalRef (click)="close($event)">
      <div class="bg-base-200 p-4 md:p-8 {{ classes() }}">
        <ng-content />
      </div>
    </div>
  `,
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent extends Modal {
  classes = input<string>();

  modalRef = viewChild.required<ElementRef>('modalRef');

  close(event: MouseEvent) {
    if (event.target === this.modalRef().nativeElement) {
      this.modal.close();
    }
  }
}
