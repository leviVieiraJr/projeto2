// src/app/services/clientes.service.ts
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientes: Cliente[] = [];
  private idCounter: number = 1;

  adicionarCliente(cliente: Cliente) {
    cliente.id = this.idCounter++;
    this.clientes.push(cliente);
  }

  getClientes(): Cliente[] {
    return this.clientes;
  }

  buscarClientePorNome(nome: string): Cliente[] {
    return this.clientes.filter(cliente => cliente.nome.toLowerCase().includes(nome.toLowerCase()));
  }
}
