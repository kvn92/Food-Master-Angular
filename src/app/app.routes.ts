import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { IngredientComponent } from './pages/ingredient/ingredient.component';
import { AjoutRecetteComponent } from './pages/recette/ajout-recette/ajout-recette.component';
export const routes: Routes = [
   {
    path:'ajouter-personne', component: FormComponent
   },
   {
      path:'login', component: LoginComponent
   },
   {
      path:'register', component: RegisterComponent
   },
   {
      path:'recette', component: AjoutRecetteComponent
   }
   ,{
      path:'**',
      component: NotFoundComponent
   }
];