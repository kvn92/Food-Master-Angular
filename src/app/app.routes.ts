import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { AjoutRecetteComponent } from './pages/recette/ajout-recette/ajout-recette.component';
import { ListRecetteComponent } from './pages/recette/list-recette/list-recette.component';
import { EditRecetteComponent } from './pages/recette/edit-recette/edit-recette.component';
import { DetailRecetteComponent } from './pages/recette/detail-recette/detail-recette.component';
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
      path:'recette', component: ListRecetteComponent
   },
   {
      path:'recette/:id', component: DetailRecetteComponent
   },
   {
      path:'recette/:id', component: EditRecetteComponent
   }
   ,{
      path:'recette', component:AjoutRecetteComponent
   }
   ,{
      path:'**',
      component: NotFoundComponent
   }
];