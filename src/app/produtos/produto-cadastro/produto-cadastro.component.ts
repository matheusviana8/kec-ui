import { ClienteFiltro } from './../../clientes/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { VendedorService } from 'src/app/vendedores/vendedor.service';
import { Produto } from 'src/app/core/model';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { DepFlags } from '@angular/compiler/src/core';
import { GrupoService, GrupoFiltro } from 'src/app/grupos/grupo.service';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {
  produto = new Produto();
  fornecedores = [];
  grupos = [];
  filtro = new ClienteFiltro();
  filtroGrupo = new GrupoFiltro();
  constructor(
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private grupoService: GrupoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    
  ) { }

  

  ngOnInit() {

    const idProduto = this.route.snapshot.params['id'];

    this.title.setTitle('Novo produto');

    if (idProduto) {
      this.carregarProduto(idProduto);
    }

    this.carregarFornecedores();
    this.carregarGrupos();
  }

  carregarProduto(id: number) {
    this.produtoService.buscarPorCodigo(id)
      .then(produto => {
        this.produto = produto;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProduto(form);
    } else {
      this.adicionarProduto(form);
    }
  }

  adicionarProduto(form: FormControl) {
    this.produtoService.adicionar(this.produto)
      .then(produtoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Produto adicionado com sucesso!' });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/produtos', produtoAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProduto(form: FormControl) {
    this.produtoService.atualizar(this.produto)
      .then(produto => {
        this.produto = produto;

        this.messageService.add({ severity: 'success', detail: 'Produto alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.produto.id)
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.produto = new Produto();
    }.bind(this), 1);

    this.router.navigate(['/produtos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de produto: ${this.produto.descricao}`);
  }

  carregarFornecedores() {
    this.filtro.tipo = "FORNECEDOR"
    return this.clienteService.pesquisar(this.filtro)
      .then(fornecedores => {
        this.fornecedores = fornecedores.clientes.map(c => ({ label: c.nome, value: c }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarGrupos() {
    return this.grupoService.pesquisar(this.filtroGrupo)
      .then(grupos => {
        this.grupos = grupos.grupos.map(g => ({ label: g.descricao, value: g }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
