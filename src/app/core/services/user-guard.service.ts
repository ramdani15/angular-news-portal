import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAdminUser().pipe(
      map((loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
