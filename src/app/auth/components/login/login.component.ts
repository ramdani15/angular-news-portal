import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../services/types';
import { Router } from '@angular/router';
import { ROLES } from '../../../shared/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form: LoginRequest = {
    email: '',
    password: '',
  }
  errorMessages: { [key: string]: string } = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['articles']);
    }
  }

  login() {
    this.authService.login(this.form).subscribe({
      next: (response) => {
        if (response.data.user.roles[0] == ROLES.ADMIN) {
          alert('Login successful as admin');
          this.router.navigate(['admin/articles']);
        } else if (response.data.user.roles[0] == ROLES.USER) {
          alert('Login successful');
          this.router.navigate(['user/articles']);
        } else {
          alert('Login failed');
          this.router.navigate(['login']);
        }
      },
      error: (err) => {
        console.error('Login error', err);
        if (err.errors) {
          for (const field in err.errors) {
            this.errorMessages[field] = err.errors[field][0];
          }
        } else if (err.message) {
          this.errorMessages['general'] = err.message;
        } else {
          this.errorMessages['general'] = 'An unexpected error occurred. Please try again.';
        }
      },
    });
  }
}
