import { FormaPagamento, StatusPedido } from './../../core/model';
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
  finalizado : Boolean;

 // tipos = ['FINAL','REVENDA','DISTRIBUICAO'];
 filtro = new ClienteFiltro();
  formaPagamento = [];
  status =[];
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
      if (this.pedido.status = "EMITIDO"){
         this.finalizado = true;
      }
    }else{
      this.pedido.tipo = "E";
      this.pedido.natureza = "V"
      this.pedido.status = "EMITIDO";
      this.pedido.dataCriacao = new Date;
      this.finalizado = false;
    }
    

    this.carregarVendedores();
    this.carregarClientes();
    this.carregarFormulario();
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
      .then(pedido => {
        this.pedido = pedido;

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

  carregarFormulario(){
    for (let key in FormaPagamento) {
      let labelEnum = FormaPagamento[key];
      let valueEnum = key;
      this.formaPagamento.push({label: labelEnum, value: valueEnum});
    }

    for (let key in StatusPedido) {
      let labelEnum = StatusPedido[key];
      let valueEnum = key;
      this.status.push({label: labelEnum, value: valueEnum});
    }
  }

  get alteravel(){
     return !Boolean(this.pedido.id && this.finalizado)
  }
}
