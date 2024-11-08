import { Component } from '@angular/core';

interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  novoCliente: Cliente = { nome: '', email: '', telefone: '', cpf: '', endereco: '' };
  pesquisa: string = '';
  clientes: Cliente[] = [];

  cadastrarCliente() {
    this.clientes.push({ ...this.novoCliente });
    this.novoCliente = { nome: '', email: '', telefone: '', cpf: '', endereco: '' };
  }

  buscarClientes(): Cliente[] {
    return this.clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
    );
  }
}
