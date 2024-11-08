import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancasService {
  private apiUrl = 'http://localhost:4200/api/financas';

  constructor(private http: HttpClient) {}

  getFinancas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  registrarVenda(venda: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, venda);
  }
}
