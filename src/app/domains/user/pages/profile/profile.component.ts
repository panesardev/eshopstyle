import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../../../products/components/product-list.component';
import { AuthService } from '../../../../auth/auth.service';
import { ModalService } from '../../../../layout/modals/modal.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProductListComponent,
  ],
  templateUrl: './profile.component.html',
})
export default class ProfileComponent {
  private auth = inject(AuthService);
  private modal = inject(ModalService);

  user = toSignal(this.auth.user$);

  openLogout() {
    this.modal.openLazy(() => import('../../../../layout/modals/components/logout.component').then(c => c.LogoutComponent));
  }
}
