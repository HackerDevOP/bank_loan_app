import { Component, inject, signal } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { ILogin, InitialLogin, LoginSchema } from '../../models/MasterModels';
import { form, FormField } from '@angular/forms/signals';
import { Response } from '../../services/register-service';
import { Router, RouterLink } from '@angular/router';
import { ApplicationService } from '../../services/application-service';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginService = inject(LoginService);
  applicationService = inject(ApplicationService);
  loginModel = signal<ILogin>(InitialLogin);

  loginForm = form(this.loginModel, LoginSchema);
  route = inject(Router);

  onLogin() {
    if (this.loginForm().valid()) {
      const value = this.loginForm().value();
      this.loginService.login(value).subscribe({
        next: (res) => {
          alert(res.message);
          localStorage.setItem('user', JSON.stringify(res.data));
          this.applicationService.loginSubject$.next()
          this.route.navigate(['/home']);
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }else{
    }
  }
}
