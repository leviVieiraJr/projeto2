import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor() {}

  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'admin123') {  // Defina suas credenciais
      const token = 'admin-token';  // Token falso para simulação
      localStorage.setItem(this.tokenKey, token);
      return of(true);  // Retorna true se o login for bem-sucedido
    }
    return of(false);  // Retorna false se o login falhar
  }
  

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
