import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignUpRequest } from '../../services/types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form: SignUpRequest = {
    name: "",
    email: "",
    password: "",
  };
  errorMessages: { [key: string]: string } = {};

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.signUp(this.form).subscribe({
      next: () => {
        this.errorMessages = {};
        alert('Sign-up successful. Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Sign-up error', err);
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
