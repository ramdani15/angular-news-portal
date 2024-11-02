import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {LoginReponse, LoginRequest, LogoutResponse, SignUpRequest, SignUpResponse } from './types';
import { ROLES, User } from '../../shared/types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/v1`;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private isAdmin = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated.next(!!localStorage.getItem('token'));
    this.isAdmin.next(!!localStorage.getItem('token') && localStorage.getItem('role') === ROLES.ADMIN);
  }

  signUp(data: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.apiUrl}/auth/signup`, data).pipe(
      catchError((error) => {
        console.error('Sign-up request failed', error);
        return throwError(() => error.error || { message: 'Sign-up failed. Please try again.' });
      })
    )
  }

  login(data: LoginRequest): Observable<LoginReponse> {
    return this.http.post<LoginReponse>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((response) => {
        if (!response.data?.token) {
          console.warn('Login failed', response);
          throw new Error('Login failed. Please try again.');
        }
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.user.id);
        localStorage.setItem('role', response.data.user.roles[0]);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('name', response.data.user.name);
        this.isAuthenticated.next(true);
        this.isAdmin.next(response.data.user.roles[0] == ROLES.ADMIN);
      }),
      catchError((error) => {
        console.error('Login request failed', error);
        return throwError(() => error.error || { message: 'Login failed. Please try again.' });
      })
    );
  }

  logout(): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap((response) => {
    
        if (!response.status) {
          console.warn('Logout failed', response);
          throw new Error('Logout failed. Please try again.');
        }
        this.isAuthenticated.next(false);
        this.isAdmin.next(false);
        localStorage.removeItem('id'); 
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
      }),
      catchError((error) => {
        console.error('Logout request failed', error);
        return throwError(() => error.error || { message: 'Logout failed. Please try again.' });
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserProfile(): User {
    return {
      id: localStorage.getItem('id') || '',
      role: localStorage.getItem('role') as ROLES,
      email: localStorage.getItem('email') || '',
      name: localStorage.getItem('name') || '',
    };
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  isAdminUser(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }
}
