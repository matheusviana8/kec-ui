import { ProdutoFiltro } from './../../produtos/produto.service';
import { Component, OnInit, Input } from '@angular/core';
import { ItemPedido, Pedido, Produto } from 'src/app/core/model';
import { ProdutoService } from 'src/app/produtos/produto.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-pedido-cadastro-item',
  templateUrl: './pedido-cadastro-item.component.html',
  styleUrls: ['./pedido-cadastro-item.component.css']
})
export class PedidoCadastroItemComponent implements OnInit {

  @Input() pedido: Pedido;
  //@Input() itensPedido: Array<ItemPedido>;
  itemPedido = new ItemPedido();
  
  produtos = [];
  filtro = new ProdutoFiltro();
  totalRegistros = 0;
  itemIndex: number;

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    //this.itemPedido.produto = new Produto();
    this.carregarProdutos();
  }

  prepararNovoItem() {
    this.itemPedido = new ItemPedido();
    this.itemIndex = this.pedido.itensPedido.length;
  }

  adicionarProduto(){
     if (this.itemPedido.produto.saldo >= this.itemPedido.quantidade ){  
      for (let key in this.pedido.itensPedido) {
        let valor = this.pedido.itensPedido[key];
        if (valor.produto.id === this.itemPedido.produto.id){
          this.itemIndex = Number(key);
          this.removerItem(Number(key));
        }
      }

      this.pedido.itensPedido.splice(this.itemIndex,0,this.itemPedido);
      this.prepararNovoItem();
      
    }else{
       this.messageService.add({ severity: 'error', detail: 'Saldo insuficiente' });
    }
  }

  atualizarProduto(){
    this.itemPedido.valorUnitario = this.itemPedido.produto.valorVenda;  
    this.itemPedido.valorTotal = this.itemPedido.valorUnitario * this.itemPedido.quantidade;
  }

  removerItem(index: number) {
    this.pedido.itensPedido.splice(index, 1);
  }
  
  editarItem(index: number) {
    this.itemPedido = this.pedido.itensPedido[index];
    this.removerItem(index);
    //this.itemPedido.produto = this.pedido.itensPedido[index].produto;
    //this.itemPedido.quantidade = this.pedido.itensPedido[index].quantidade;
  }
  carregarProdutos() {
    this.produtoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.produtos = resultado.produtos;
      })
      .catch(erro => this.errorHandler.handle(erro));
    
  }

}
