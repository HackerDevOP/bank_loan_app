import { Component, inject, signal } from '@angular/core';
import { InitialRegister, IRegister, RegisterSchema } from '../../models/MasterModels';
import { form, FormField } from '@angular/forms/signals';
import { RegisterService, Response } from '../../services/register-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  protected registerModel = signal<IRegister>(InitialRegister);
  protected route = inject(Router);
  private registerService = inject(RegisterService);

  registerForm = form(this.registerModel, RegisterSchema);

  onRegister() {
    if (this.registerForm().valid()) {
      this.registerService.register(this.registerForm().value()).subscribe({
        next: (res) => {
          alert(`'Register success', ${res.message}`);
          this.route.navigateByUrl('login');
        },
        error: (error: Response) => {
          alert(`"error": ${error.message}`);
        },
      });
    } else {
      console.log('Invalid form');
    }
  }
}
