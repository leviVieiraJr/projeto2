// src/app/services/vendas.service.ts
import { Injectable } from '@angular/core';
import { Venda } from '../models/venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  private vendas: Venda[] = []; // Histórico de vendas

  adicionarVenda(venda: Venda) {
    this.vendas.push(venda);
  }

  getVendas(): Venda[] {
    return this.vendas;
  }

  calcularReceitaTotal(): number {
    return this.vendas.reduce((total, venda) => total + venda.valor, 0);
  }
}
