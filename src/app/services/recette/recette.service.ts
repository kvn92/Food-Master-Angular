import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Recette } from '../../models/recette.models';

@Injectable({
 
  providedIn: 'root'
})
export class RecetteService {
  private API_URL = 'http://127.0.0.1:8000/api/recette'; // URL de l’API Symfony

  constructor(private http: HttpClient) {}

  // 📌 Récupérer toutes les recettes
  getRecettes(): Observable<Recette[]> {
    return this.http.get<Recette[]>(this.API_URL).pipe(
      tap(data => console.log("✅ Données reçues :", data)) // Affiche les données en console
    );
  }

  // 📌 Récupérer une recette par son ID
  getRecetteById(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.API_URL}/${id}`);
  }

  // 📌 Ajouter une nouvelle recette
  addRecette(recette: Recette): Observable<Recette> {
    return this.http.post<Recette>(this.API_URL, recette);
  }

  // 📌 Modifier une recette
  updateRecette(id: number, recette: Recette): Observable<Recette> {
    return this.http.put<Recette>(`${this.API_URL}/${id}`, recette);
  }

  // 📌 Supprimer une recette
  deleteRecette(id: number): Observable<Recette> {
    return this.http.delete<Recette>(`${this.API_URL}/${id}`);
  }

  // ✅ 📌 MÉTHODES MÉTIER (Logique de transformation)

  // 📌 Transformer un niveau en label
  getNiveauLabel(niveau: number): string {
    return ['Facile', 'Moyen', 'Difficile'][niveau] || 'Inconnu';
  }

  // 📌 Transformer un type de repas en label
  getRepasLabel(id: number): string {
    const repasOptions = [
      { id: 1, nom: 'Petit-déjeuner' },
      { id: 2, nom: 'Déjeuner' },
      { id: 3, nom: 'Dîner' }
    ];
    return repasOptions.find(r => r.id === id)?.nom || 'Autre';
  }

  // 📌 Formater la date en `jj/mm/aaaa`
  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString();
  }
}
