import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

export interface RegisterData {
  pseudo: string;
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://127.0.0.1:8000/api'; // URL de l’API Symfony

  user = signal<User | null | undefined>(null);

  register(registerData: RegisterData): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/register`, registerData).pipe(
      tap((newUser) => {
        console.log('Utilisateur inscrit avec succès:', newUser);
      })
    );
  }
}
