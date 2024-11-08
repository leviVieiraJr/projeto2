// src/app/components/financas/financas.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstoqueService } from '../../services/estoque.service';

// Definir a interface Produto
interface Produto {
  nome: string;
  quantidade: number;
  preco: number;
  // Adicione outros campos conforme necessário
}

interface Venda {
  produto: string;
  quantidade: number;
  valor: number;
  data: Date;
}

@Component({
  selector: 'app-financas',
  templateUrl: './financas.component.html',
  styleUrls: ['./financas.component.css']
})
export class FinancasComponent implements OnInit {
  vendaForm: FormGroup;
  vendas: Venda[] = [];
  produtos: Produto[] = []; // Agora 'produtos' tem o tipo 'Produto[]'

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService // Injeção do EstoqueService
  ) {
    this.vendaForm = this.fb.group({
      produto: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      valor: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Carrega a lista de produtos do estoque ao iniciar o componente
    this.estoqueService.obterProdutos().subscribe((produtos: Produto[]) => { // Define o tipo aqui
      this.produtos = produtos;
    });
  }

  registrarVenda() {
    if (this.vendaForm.valid) {
      const produtoSelecionado = this.vendaForm.value.produto;
      const quantidade = this.vendaForm.value.quantidade;
      const valor = this.vendaForm.value.valor;

      // Busca o produto no estoque
      this.estoqueService.buscarProdutoPorNome(produtoSelecionado).subscribe(produtoEstoque => {
        if (produtoEstoque && produtoEstoque.quantidade >= quantidade) {
          // Registra a venda
          const novaVenda: Venda = {
            produto: produtoSelecionado,
            quantidade: quantidade,
            valor: valor,
            data: new Date(),
          };
          this.vendas.push(novaVenda);

          // Atualiza o estoque após a venda
          const novaQuantidade = produtoEstoque.quantidade - quantidade;
          this.estoqueService.atualizarQuantidadePorNome(produtoSelecionado, novaQuantidade)
            .subscribe(() => {
              console.log(`Quantidade de ${produtoSelecionado} atualizada para ${novaQuantidade}`);
            });

          // Reseta o formulário para os valores iniciais
          this.vendaForm.reset({ quantidade: 1, valor: 0 });
        } else {
          console.error('Estoque insuficiente para realizar a venda.');
        }
      });
    }
  }
}
