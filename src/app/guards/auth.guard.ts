import { inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

export class AuthGuard implements CanActivate {
  private router = inject(Router);

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Vérifie si le token est présent
    if (!token) {
      this.router.navigate(['/api/login']); // Redirige vers login si non authentifié
      return false;
    }
    return true;
  }
}
