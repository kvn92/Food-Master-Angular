import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../../../services/recette/recette.service';
import { Recette } from '../../../models/recette.models';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-recette',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-recette.component.html',
  styleUrls: ['./edit-recette.component.css']
})
export class EditRecetteComponent implements OnInit {
  recetteForm!: FormGroup;
  isLoading = true;
  errorMessage = '';

  private recetteService = inject(RecetteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.loadRecette();
  }

  // 📌 Charger la recette existante
  loadRecette(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = "ID invalide.";
      this.isLoading = false;
      return;
    }

    this.recetteService.getRecetteById(id).subscribe({
      next: (recette: Recette) => {
        this.recetteForm = this.formBuilder.group({
          titre: [recette.titre, Validators.required],
          preparation: [recette.preparation, Validators.required],
          photo: [recette.photo, Validators.required],
          niveau: [recette.niveau],
          repas: [recette.repas],
          viande: [recette.viande],
          duree: [recette.duree, Validators.required]
        });
        this.isLoading = false;
      },
      error: (error:HttpErrorResponse) => {
        console.error("❌ Erreur :", error);
        this.errorMessage = "Impossible de charger la recette.";
        this.isLoading = false;
      }
    });
  }

  // 📌 Sauvegarder les modifications
  updateRecette(): void {
    if (this.recetteForm.invalid) return;

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recetteService.updateRecette(id, this.recetteForm.value).subscribe({
      next: () => this.router.navigate(['/recettes']),
      error: (error: HttpErrorResponse) => {
        console.error("❌ Erreur lors de la mise à jour :", error);
        this.errorMessage = "Impossible de mettre à jour la recette.";
      }
    });
  }
}
