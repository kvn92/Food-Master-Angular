import { Component, input, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModel } from '../../models/footer.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl:'./footer.component.css',
  imports: [CommonModule,ReactiveFormsModule],
})
export class FooterComponent {
  // ✅ Remplace @Input() par input() pour gérer la réactivité
  footerData = input<FooterModel>(FooterModel.getDefault());

  // ✅ `computed()` permet de dériver des valeurs dynamiquement
  logoUrl = computed(() => this.footerData().logoUrl);
  annee = computed(() => this.footerData().annee);
  liens = computed(() => this.footerData().liens);
  reseaux = computed(() => this.footerData().reseaux);
}
