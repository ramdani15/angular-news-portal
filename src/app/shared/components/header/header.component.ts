import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        alert(response.message || 'Logout successful');
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error('Logout error', err);
        alert(err.message || 'An unexpected error occurred. Please try again.');
      },
    });
  }
}
