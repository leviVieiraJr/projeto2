import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';  // Certifique-se de importar corretamente

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;  // O usuário está autenticado, pode acessar a rota
    } else {
      this.router.navigate(['/login']);  // Redireciona para a página de login
      return false;
    }
  }
}
