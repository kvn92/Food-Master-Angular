import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Credentials, LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private destroy$ = new Subject<void>(); // Pour gérer les abonnements et éviter les fuites mémoire

  loginFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  invalidCredentials = false;
  isLoading = false; // Indicateur de chargement
  errorMessage = ''; // Stocker un message d'erreur plus clair

  login() {
    if (this.loginFormGroup.invalid) return; // Vérification de la validité du formulaire

    this.isLoading = true; // Active le loader
    this.invalidCredentials = false; // Réinitialise l'erreur
    this.errorMessage = '';

    this.loginService.login(
      this.loginFormGroup.getRawValue() as Credentials
    ).pipe(
      takeUntil(this.destroy$) // Gestion des abonnements
    ).subscribe({
      next: () => {
        this.isLoading = false;
        this.navigateHome();
      },
      error: error => {
        console.error('Erreur de connexion:', error);
        this.invalidCredentials = true;
        this.isLoading = false; // Désactive le loader après l'échec

        if (error.status === 401) {
          this.errorMessage = "Identifiants incorrects. Veuillez réessayer.";
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
        }
      }
    });
  }

  navigateHome() {
    this.router.navigate(['/dashboard']); // Redirige après connexion
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}