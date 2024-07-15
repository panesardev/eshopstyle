import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { ModalComponent } from '../modal.component';
import { Modal } from '../modal.class';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    AsyncPipe,
    ModalComponent,
  ],
  template: `
    <app-modal classes="max-w-md mt-20 mx-auto">
      <h1 class="text-red-500 text-xl font-bold mb-3">Are you sure?</h1>
      <p class="mb-8">You will be logged out!</p>
      <div class="grid grid-cols-2 gap-4 items-center">
        <button class="bg-base-100 text-primary py-3 px-6 w-full" (click)="modal.close()">Cancel</button>
        <button class="bg-red-500 text-red-50 py-3 px-6 w-full" (click)="logout()">Logout</button>
      </div>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent extends Modal {
  private auth = inject(AuthService);

  async logout() {
    await this.auth.logout();
    this.modal.close();
  }
}
