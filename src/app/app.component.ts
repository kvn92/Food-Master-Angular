import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { FooterModel } from './models/footer.model';
import { MenuComponent } from './components/menu/menu.component';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet,MenuComponent,FooterComponent],
})
export class AppComponent implements OnDestroy {


 private router = inject(Router);
  loginService = inject(LoginService);
  

 private logoutSubscription: Subscription | null = null; 

  logout(){
    this.logoutSubscription = this.loginService.logout().subscribe({
      next: _=> {
        this.navigateToLogin();
      },
      error: _=> {
        this.navigateToLogin();

      }
    })
  }

  navigateToLogin(){
    this.router.navigate(['login']);
  }

  navigateHome(){
    this.router.navigate(['home']);
  }

  navigateIngredient(){
    this.router.navigate(['home']);
  }


  ngOnDestroy(): void {
      this.logoutSubscription?.unsubscribe();
  }

  // ✅ Signal contenant les données du footer
  footerData = signal(FooterModel.getDefault());



}
