import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Pedido } from './../core/model';
import { MoneyHttp } from '../seguranca/money-http';

export class PedidoFiltro {
  id: string;
  nome: string;
  tipo: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PedidoService {

  pedidosUrl: string;

  constructor(private http: MoneyHttp) {
    this.pedidosUrl = `${environment.apiUrl}/pedidos`;
  }

  /*urlUploadAnexo(): string {
    return `${this.pedidosUrl}/anexo`;
  }*/

  pesquisar(filtro: PedidoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.id) {
      params = params.append('id', filtro.id);
    }

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.tipo) {
      params = params.append('tipo', filtro.tipo);
    }

    return this.http.get<any>(`${this.pedidosUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const pedidos = response.content;

        const resultado = {
          pedidos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.pedidosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  
  }

  adicionar(pedido: Pedido): Promise<Pedido> {
    return this.http.post<Pedido>(this.pedidosUrl, pedido)
      .toPromise();
  }

  atualizar(pedido: Pedido): Promise<Pedido> {
    return this.http.put<Pedido>(`${this.pedidosUrl}/${pedido.id}`, pedido)
      .toPromise()
      .then(response => {
        const pedidoAlterado = response;

        this.converterStringsParaDatas([pedidoAlterado]);

        return pedidoAlterado;
      });
  }

  buscarPorCodigo(id: number): Promise<Pedido> {
    return this.http.get<Pedido>(`${this.pedidosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const pedido = response;

        this.converterStringsParaDatas([pedido]);

        return pedido;
      });
  }

  private converterStringsParaDatas(pedidos: Pedido[]) {
    for (const pedido of pedidos) {
      if(pedido.dataCriacao){
      pedido.dataCriacao = moment(pedido.dataCriacao,
        'YYYY-MM-DD').toDate();
      }
    }
  }

}