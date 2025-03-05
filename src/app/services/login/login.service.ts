import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { User } from '../../models/user.model';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://127.0.0.1:8000/api'; // Assurez-vous que Symfony tourne bien sur ce port

  user = signal<User | null | undefined>(null);

  login(credentials: Credentials): Observable<User | null | undefined> {
    return this.http.post<{ token: string; user: User }>(`${this.BASE_URL}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Stocker le token JWT
        this.user.set(response.user);
      }),
      map(response => response.user)
    );
  }

  getUsers(): Observable<User | null | undefined> {
    return this.http.get<{ user: User }>(`${this.BASE_URL}/me`).pipe(
      tap(response => {
        this.user.set(response.user);
      }),
      map(response => response.user)
    );
  }

  logout(): Observable<null> {
    return this.http.post(`${this.BASE_URL}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.user.set(null);
      }),
      map(() => null)
    );
  }
}
