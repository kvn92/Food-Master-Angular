import { Component, signalInput, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModel } from '../../models/footer.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule], // ✅ Import nécessaire pour @for
})
export class FooterComponent {
  // ✅ Signal réactif pour recevoir les données du parent
  @signalInput() footerData!: Signal<FooterModel>;

  // ✅ Computed properties pour éviter les erreurs et avoir des valeurs par défaut
  logoUrl = computed(() => this.footerData()?.logoUrl ?? FooterModel.getDefault().logoUrl);
  annee = computed(() => this.footerData()?.annee ?? FooterModel.getDefault().annee);
  liens = computed(() => this.footerData()?.liens ?? FooterModel.getDefault().liens);
  reseaux = computed(() => this.footerData()?.reseaux ?? FooterModel.getDefault().reseaux);
}
