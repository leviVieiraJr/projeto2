import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private apiUrl = 'http://localhost:4200/api/estoque';

  constructor(private http: HttpClient) {}

  // Método para obter a lista de produtos
  obterProdutos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/produtos`); // Supondo que a rota seja '/produtos'
  }

  getEstoque(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProduto(produto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, produto);
  }

  atualizarQuantidadePorNome(nomeProduto: string, novaQuantidade: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/quantidade`, { nomeProduto, novaQuantidade });
  }

  buscarProdutoPorNome(nomeProduto: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/produto`, { params: { nome: nomeProduto } });
  }
}
