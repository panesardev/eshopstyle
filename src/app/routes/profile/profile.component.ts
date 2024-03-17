import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../../layout/components/product-list.component';
import { AuthService } from '../../services/auth.service';
import { computedAsync } from 'ngxtension/computed-async';
import { ModalService } from '../../services/modal.service';
import { LogoutModalComponent } from '../../layout/modals/logout-modal.component';

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

  user = computedAsync(() => this.auth.user$);

  openLogout() {
    this.modal.open(LogoutModalComponent);
  }
}
