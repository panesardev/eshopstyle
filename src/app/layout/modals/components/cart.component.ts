import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Modal } from '../modal.class';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ModalComponent,
  ],
  template: `
    <app-modal classes="md:w-[700px] md:ml-auto h-full">
      
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent extends Modal {

}
