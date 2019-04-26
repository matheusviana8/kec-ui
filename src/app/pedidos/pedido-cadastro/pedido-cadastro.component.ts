import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { VendedorService } from 'src/app/vendedores/vendedor.service';
import { Pedido } from 'src/app/core/model';
import { Produto } from 'src/app/models/produto';
import { ClienteService, ClienteFiltro } from 'src/app/clientes/cliente.service';

@Component({
  selector: 'app-pedido-cadastro',
  templateUrl: './pedido-cadastro.component.html',
  styleUrls: ['./pedido-cadastro.component.css']
})
export class PedidoCadastroComponent implements OnInit {
  pedido = new Pedido();
  produto = new Produto();
  vendedores = [];
  clientes = [];

 // tipos = ['FINAL','REVENDA','DISTRIBUICAO'];
 filtro = new ClienteFiltro();
  tipos = [{
    "value": "FINAL",
    "label": "FINAL"
}, {
    "value": "REVENDA",
    "label": "REVENDA"
}, {
  "value": "DISTRIBUICAO",
  "label": "DISTRIBUICAO"
}, {
  "value": "FORNECEDOR",
  "label": "FORNECEDOR"
}]

  constructor(
    private pedidoService: PedidoService,
    private vendedorService: VendedorService,
    private errorHandler: ErrorHandlerService,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    
  ) { }

  

  ngOnInit() {
    const idPedido = this.route.snapshot.params['id'];

    this.title.setTitle('Novo pedido');

    if (idPedido) {
      this.carregarPedido(idPedido);
    }

    this.carregarVendedores();
    this.carregarClientes();
  }

  carregarPedido(id: number) {
    this.pedidoService.buscarPorCodigo(id)
      .then(pedido => {
        this.pedido = pedido;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPedido(form);
    } else {
      this.adicionarPedido(form);
    }
  }

  adicionarPedido(form: FormControl) {
    this.pedidoService.adicionar(this.pedido)
      .then(pedidoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Pedido adicionado com sucesso!' });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/pedidos', pedidoAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPedido(form: FormControl) {
    this.pedidoService.atualizar(this.pedido)
      .then(lancamento => {
        this.pedido = lancamento;

        this.messageService.add({ severity: 'success', detail: 'Pedido alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pedido.id)
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pedido = new Pedido();
    }.bind(this), 1);

    this.router.navigate(['/pedidos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pedido: ${this.pedido.cliente.nome}`);
  }

  carregarVendedores() {
    return this.vendedorService.listar()
      .then(vendedores => {
        this.vendedores = vendedores;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarClientes() {
    this.filtro.tipo = "FINAL"
    return this.clienteService.pesquisar(this.filtro)
      .then(clientes => {
        this.clientes = clientes.clientes.map(c => ({ label: c.nome, value: c }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
