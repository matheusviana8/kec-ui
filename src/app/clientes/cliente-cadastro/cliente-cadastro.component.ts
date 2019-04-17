import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { VendedorService } from 'src/app/vendedores/vendedor.service';
import { Cliente } from 'src/app/core/model';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {
  cliente = new Cliente();
  vendedores = [];
 // tipos = ['FINAL','REVENDA','DISTRIBUICAO'];

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
    private clienteService: ClienteService,
    private vendedorService: VendedorService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    
  ) { }

  

  ngOnInit() {
    const idCliente = this.route.snapshot.params['id'];

    this.title.setTitle('Novo cliente');

    if (idCliente) {
      this.carregarCliente(idCliente);
    }

    this.carregarVendedores();
    //this.carregarPessoas();
  }

  carregarCliente(id: number) {
    this.clienteService.buscarPorCodigo(id)
      .then(cliente => {
        this.cliente = cliente;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCliente(form);
    } else {
      this.adicionarCliente(form);
    }
  }

  adicionarCliente(form: FormControl) {
    this.clienteService.adicionar(this.cliente)
      .then(clienteAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Cliente adicionado com sucesso!' });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/clientes', clienteAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCliente(form: FormControl) {
    this.clienteService.atualizar(this.cliente)
      .then(lancamento => {
        this.cliente = lancamento;

        this.messageService.add({ severity: 'success', detail: 'Cliente alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.cliente.id)
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.cliente = new Cliente();
    }.bind(this), 1);

    this.router.navigate(['/clientes/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de cliente: ${this.cliente.nome}`);
  }

  carregarVendedores() {
    return this.vendedorService.listar()
      .then(vendedores => {
        this.vendedores = vendedores;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
