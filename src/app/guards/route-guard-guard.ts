import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { readLocalStorage } from '../helpers/local-storage-helper';
import { LOCAL_STORAGE_KEY } from '../constants/global-const';

export const routeGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedUser = readLocalStorage(LOCAL_STORAGE_KEY.USER);
  if (loggedUser) {
    try {
      if (loggedUser?.userId) {
        return true;
      }
    } catch {
      localStorage.removeItem('loggedUser');
    }
  }
  return router.navigate(['login']);
};
