import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonModel } from "../../models/person.model";

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form.component.html'
})
export class FormComponent {
    formulaire: FormGroup;
    person: PersonModel = { nom: '', prenom: '', photo: undefined };
    photoPreview: string | ArrayBuffer | null = null; // Aperçu de l'image

    constructor(private fb: FormBuilder) {
        this.formulaire = this.fb.group({
            nom: [this.person.nom, [Validators.required, Validators.minLength(2)]],
            prenom: [this.person.prenom, [Validators.required, Validators.minLength(2)]]
        });
    }

    onSubmit() {
        if (this.formulaire.valid) {
            this.person = {
                ...this.formulaire.value, // Récupère nom et prénom
                photo: this.person.photo  // Ajoute la photo sélectionnée
            };

            console.log('Formulaire soumis avec :', this.person);
        } else {
            console.log('Formulaire invalide');
        }
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        this.person.photo = file;

        // Générer un aperçu de l'image sélectionnée
        const reader = new FileReader();
        reader.onload = () => this.photoPreview = reader.result;
        reader.readAsDataURL(file);
    }
}
