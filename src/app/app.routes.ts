import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
export const routes: Routes = [
   {
    path:'ajouter-personne', component: FormComponent
   },
   {
      path:'login', component: LoginComponent
   }
   ,{
      path:'**',
      component: NotFoundComponent
   }
];