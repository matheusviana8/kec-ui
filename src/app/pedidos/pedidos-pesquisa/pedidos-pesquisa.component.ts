import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PedidoService, PedidoFiltro } from './../pedido.service';

@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css']
})
export class PedidosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PedidoFiltro();
  pedidos = [];

  @ViewChild('tabela') grid;

  constructor(
    private pedidoService: PedidoService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pedidos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
console.log(this.filtro);
    this.pedidoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pedidos = resultado.pedidos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pedido: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pedido);
      }
    });
  }

  excluir(pedido: any) {
    this.pedidoService.excluir(pedido.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Pedido excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}