import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { RecetteService } from '../../../services/recette/recette.service';
import { Recette } from '../../../models/recette.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-recette',
  imports: [CommonModule],
  templateUrl: './detail-recette.component.html',
  styleUrls: ['./detail-recette.component.css']
})
export class DetailRecetteComponent implements OnInit {
  recette: Recette | null = null;
  isLoading = true;
  errorMessage = '';

  private recetteService = inject(RecetteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadRecette();
  }

  // 📌 Récupérer la recette par son ID depuis l'URL
  loadRecette(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = "ID de recette invalide.";
      this.isLoading = false;
      return;
    }

    this.recetteService.getRecetteById(id).subscribe({
      next: (data) => {
        console.log("✅ Réponse reçue dans Angular :", data); // 🔍 Debug
        this.recette = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("❌ Erreur lors du chargement de la recette :", error);
        console.error("❌ Erreur lors du chargement de la recette :", error);
        this.errorMessage = "Impossible de charger la recette.";
        this.isLoading = false;
      }
    });
  }

  // 📌 Retourner à la liste des recettes
  retour(): void {
    this.router.navigate(['/recette']);
  }
}
