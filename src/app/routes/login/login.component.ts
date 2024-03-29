import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Credentials, OAuthProviderName } from '../../types/auth.interface';
import { computedAsync } from 'ngxtension/computed-async';

export type LoginFormType = 'LOGIN' | 'SIGN_UP' | 'RESET_PASSWORD' ;

export interface LoginFormState {
  credentials: Credentials;
  type: LoginFormType;
}

export const initialState: LoginFormState = {
  type: 'LOGIN',
  credentials: {
    displayName: '',
    email: '',
    password: '',
  },
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

  user = computedAsync(() => this.auth.user$);
  
  state = signal<LoginFormState>(initialState);
  error = signal<string>(null);
  
  isLoginForm = computed(() => this.state().type === 'LOGIN');
  isSignUpForm = computed(() => this.state().type === 'SIGN_UP');
  isResetPasswordForm = computed(() => this.state().type === 'RESET_PASSWORD');
  
  heading = computed(() => {
    return this.state().type === 'RESET_PASSWORD' ? 'Reset password' :
      this.state().type === 'SIGN_UP' ? 'Create new account' : 
      this.state().type === 'LOGIN' ? 'Login' : null;
  });

  async submit(): Promise<void> {
    try {
      switch (this.state().type) {
        case 'LOGIN': 
          await this.auth.login(this.state().credentials);
          break;
        case 'SIGN_UP': 
          await this.auth.signUp(this.state().credentials);
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
      await this.auth.socialLogin(providerName);
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