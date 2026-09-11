import { Component, DestroyRef, inject, signal } from '@angular/core';
import { InitialRegister, IRegister, RegisterSchema } from '../../models/MasterModels';
import { form, FormField } from '@angular/forms/signals';
import { RegisterService, Response } from '../../services/register-service';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  protected registerModel = signal<IRegister>(InitialRegister);
  protected router = inject(Router);
  private registerService = inject(RegisterService);
  destroyRef = inject(DestroyRef);

  registerForm = form(this.registerModel, RegisterSchema);

  onRegister() {
    if (this.registerForm().valid()) {
      this.registerService
        .register(this.registerForm().value())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res:{message:string}) => {
            alert(`Register success: ${res.message}`);
            this.router.navigateByUrl('login');
            console.log(res.message)
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
