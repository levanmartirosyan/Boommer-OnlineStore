import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const routeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookies = inject(CookieService);
  const token = cookies.get('userToken');

  if (token) {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
