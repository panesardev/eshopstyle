import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Credentials, OAuthProviderName } from '../../auth/auth.interface';
import { AuthService } from '../../auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

export type LoginFormType = 'LOGIN' | 'SIGN_UP' | 'RESET_PASSWORD' ;

export interface LoginFormState {
  credentials: Credentials;
  type: LoginFormType;
}

export function initialLoginFormState(): LoginFormState {
  return {
    type: 'LOGIN',
    credentials: {
      displayName: '',
      email: '',
      password: '',
    },
  };
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  private auth = inject(AuthService);

  user = toSignal(this.auth.user$);
  
  state = signal<LoginFormState>(initialLoginFormState());
  error = signal<string>(null);
  
  isLoginForm = computed(() => this.state().type === 'LOGIN');
  isSignUpForm = computed(() => this.state().type === 'SIGN_UP');
  isResetPasswordForm = computed(() => this.state().type === 'RESET_PASSWORD');
  
  heading = computed(() =>
    this.state().type === 'RESET_PASSWORD' ? 'Reset password' :
    this.state().type === 'SIGN_UP' ? 'Create new account' : 
    this.state().type === 'LOGIN' ? 'Login' : 
    null,
  );

  async submit(): Promise<void> {
    try {
      switch (this.state().type) {
        case 'LOGIN': 
          await this.auth.login(this.state().credentials);
          break;
        case 'SIGN_UP': 
          await this.auth.createAccount(this.state().credentials);
          break;
        case 'RESET_PASSWORD': 
          await this.auth.resetPassword(this.state().credentials);
          break;
      }
    } catch (e) {
      this.error.set(e.message);
    }
  }
  
  async socialLogin(providerName: OAuthProviderName): Promise<void> {
    try {
      await this.auth.oAuthLogin(providerName);
    } catch (e) {
      this.error.set(e.message);
    }
  }

  setFormType(type: LoginFormType): void {
    this.state.update(value => {
      return { ...value, type };
    });
  }
}