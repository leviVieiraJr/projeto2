// src/app/models/cliente.model.ts
export class Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    endereco: string;
  
    constructor(id: number, nome: string, email: string, telefone: string, cpf: string, endereco: string) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
      this.cpf = cpf;
      this.endereco = endereco;
    }
  }
  