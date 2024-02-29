import { Component, inject, input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  template: `
    <div class="{{ modal.isClosed() ? 'modal-overlay-out' : 'modal-overlay-in' }} fixed inset-0 z-[100] bg-[#0000003f]"></div>
    <div class="{{ modal.isClosed() ? 'modal-out' : 'modal-in' }} fixed inset-0 z-[101]">
      <div class="bg-base-200 p-4 md:p-8 {{ classes() }}">
        <ng-content />
      </div>
    </div>
  `,
})
export class BaseModalComponent {
  readonly modal = inject(ModalService);

  classes = input<string>('');

}