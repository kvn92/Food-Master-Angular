import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private registerService = inject(RegisterService);
  private router = inject(Router);
  private destroy$ = new Subject<void>(); // Gestion de la mémoire

  registerForm = this.formBuilder.group({
    pseudo: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        //Validators.pattern('^(?=.*[A-Z]).{6,}$') // Au moins une majuscule
      ]
    ]
  },{ nonNullable: true } 

);

  isLoading = false; // Indicateur de chargement
  errorMessage = ''; // Stockage des erreurs

  register() {
    if (this.registerForm.invalid) return; // Vérification de la validité

    this.isLoading = true;
    this.errorMessage = '';

    this.registerService.register(this.registerForm.getRawValue()).pipe(
      takeUntil(this.destroy$) // Gestion des abonnements
    ).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']); // ✅ Redirige après inscription
      },
      error: error => {
        console.error('Erreur d\'inscription:', error);
        this.isLoading = false;

        if (error.status === 400) {
          this.errorMessage = error.error.message || "Erreur dans le formulaire.";
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}