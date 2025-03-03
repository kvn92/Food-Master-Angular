import { Component, Input } from '@angular/core';
import { Personne } from '../../models/monster.model';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
 
  @Input() info : Personne = new Personne();
}
