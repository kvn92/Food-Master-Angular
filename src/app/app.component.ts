import { Component, signal } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { FooterModel } from './models/footer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [FooterComponent], // ✅ Importation du FooterComponent
})
export class AppComponent {
  // ✅ Signal réactif contenant les données du footer
  footerData = signal(FooterModel.getDefault());
}
