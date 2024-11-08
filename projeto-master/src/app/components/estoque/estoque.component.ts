import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Produto {
  nomeProduto: string;
  categoria: string;
  quantidade: number;
}

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {
  adicionarEstoqueForm: FormGroup;
  estoque: Produto[] = [];
  filteredEstoque: Produto[] = [];

  constructor(private fb: FormBuilder) {
    this.adicionarEstoqueForm = this.fb.group({
      nomeProduto: [''],
      categoria: [''],
      quantidade: ['']
    });

    // Inicialmente, a lista filtrada mostra todo o estoque
    this.filteredEstoque = this.estoque;
  }

  // Adicionar um item ao estoque
  onAddItem() {
    const novoProduto: Produto = this.adicionarEstoqueForm.value;
    this.estoque.push(novoProduto);
    this.adicionarEstoqueForm.reset();
    this.filteredEstoque = this.estoque; // Atualiza a lista filtrada
    console.log(`Produto adicionado ao estoque: ${JSON.stringify(novoProduto)}`);
  }

  // Filtrar produtos enquanto o usuário digita
  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEstoque = this.estoque.filter(produto =>
      produto.nomeProduto.toLowerCase().includes(searchTerm)
    );
  }
}
