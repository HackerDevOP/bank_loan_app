import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../../models/MasterModels';
import { ApplicationService } from '../../services/application-service';
import { clearLocalStorage, readLocalStorage } from '../../helpers/local-storage-helper';
import { LOCAL_STORAGE_KEY } from '../../constants/global-const';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  loggedUserData = signal<IUser | null>(null);
  route = inject(Router);
  applicationService = inject(ApplicationService);
  destroyRef = inject(DestroyRef);


  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  constructor() {
    this.loggedUserData.set(readLocalStorage(LOCAL_STORAGE_KEY.USER));
    this.applicationService.loginSubject$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loggedUserData.set(readLocalStorage(LOCAL_STORAGE_KEY.USER));
      },
    });
  }
  logOut() {
    clearLocalStorage(LOCAL_STORAGE_KEY.USER);
    this.route.navigateByUrl('/home');
    this.loggedUserData.set(null);
  }
}
