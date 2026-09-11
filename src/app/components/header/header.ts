import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../../models/MasterModels';
import { ApplicationService } from '../../services/application-service';

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

  constructor() {
    this.readLoggedData();
    this.applicationService.loginSubject$.subscribe({
      next: () => {
        this.readLoggedData();
      },
    });
  }
  readLoggedData() {
    const localData = localStorage.getItem('user');
    if (localData != null) {
      this.loggedUserData.set(JSON.parse(localData));
    }
  }
  logOut() {
    localStorage.removeItem('user');
    this.route.navigateByUrl('/home');
    this.loggedUserData.set(null);
  }
}
