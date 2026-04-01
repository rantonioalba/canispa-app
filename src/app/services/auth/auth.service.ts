import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { LoginResponse } from './loginResponse';
import { Profile } from 'src/app/auth/login/interfaces/profile.interface';
import { map, tap } from 'rxjs';
import { LoginMapper } from 'src/app/auth/login/mapper/login.mapper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
   private tokenKey = 'auth_token';

  profile = signal<Profile | null>(null);
  private token = signal<string | null>(null);

  //isAuthenticated = computed(() => this.profile() !== null && !this.isTokenExpired(this.token() || ''));

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Also validate token expiration if needed
    return !!token && !this.isTokenExpired(token);
  }

  doLogin(credentials:LoginRequest) {
    // Lógica de autenticación aquí
    console.log('Autenticando con credentials', credentials);
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        console.log('Respuesta del login:', response);
        this.setAuth(response);
      })
    )
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setAuth(response: LoginResponse) {
    const profile = LoginMapper.toProfile(response);
    this.profile.set(profile);
    this.token.set(response.token);

    console.log('Token expiración:', this.getTokenExpiration());

    // Store in localStorage
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_profile', JSON.stringify(profile));
  }

  // Token validation methods
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiresAt = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expiresAt;
    } catch {
      return true;
    }
  }

  getTokenExpiration(): Date | null {
    const token = this.token();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch {
      return null;
    }
  }

}
