import { Component, OnInit } from '@angular/core';
import { RecetteService } from '../../../services/recette/recette.service';
import { Recette } from '../../../models/recette.models';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-list-recette',
  imports: [CommonModule],
  templateUrl: './list-recette.component.html',
  styleUrl: './list-recette.component.css',
  standalone: true
})
export class ListRecetteComponent implements OnInit{
recettes: Recette[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    this.loadRecettes();
  }

  // 📌 Récupérer toutes les recettes
  loadRecettes(): void {
    this.recetteService.getRecettes().subscribe({
      next: (data) => {
        this.recettes = data || [] ;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des recettes :', error);
        this.errorMessage = "Impossible de charger les recettes.";
        this.isLoading = false;
      }
    });
  }

  // 📌 Supprimer une recette
  deleteRecette(id: number): void {
  if (confirm("Voulez-vous vraiment supprimer cette recette ?")) {
    console.log("🗑 Suppression en cours de l'ID :", id); // ✅ Vérification avant appel API

    this.recetteService.deleteRecette(id).subscribe({
      next: () => {
        console.log("✅ Recette supprimée avec succès :", id); // ✅ Vérification après suppression
        this.recettes = this.recettes.filter(recette => recette.id !== id);
      },
      error: (error) => {
        console.error("❌ Erreur lors de la suppression :", error);
        this.errorMessage = "Erreur lors de la suppression.";
      }
    });
  }
}



  // 📌 Récupérer le label du niveau
  getNiveauLabel(niveau: number): string {
    return this.recetteService.getNiveauLabel(niveau);
  }

  // 📌 Récupérer le label du type de repas
  getRepasLabel(id: number): string {
    return this.recetteService.getRepasLabel(id);
  }

  // 📌 Formater la date
  getFormattedDate(date: Date | string): string {
    return this.recetteService.formatDate(date);
  }
}
