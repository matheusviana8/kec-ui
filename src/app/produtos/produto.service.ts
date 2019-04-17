import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Produto } from './../core/model';
import { MoneyHttp } from '../seguranca/money-http';

export class ProdutoFiltro {
  id: string;
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class ProdutoService {

  produtosUrl: string;

  constructor(private http: MoneyHttp) {
    this.produtosUrl = `${environment.apiUrl}/produtos`;
  }

  /*urlUploadAnexo(): string {
    return `${this.produtosUrl}/anexo`;
  }*/

  pesquisar(filtro: ProdutoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.id) {
      params = params.append('id', filtro.id);
    }

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    return this.http.get<any>(`${this.produtosUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const produtos = response.content;

        const resultado = {
          produtos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.produtosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(produto: Produto): Promise<Produto> {
    return this.http.post<Produto>(this.produtosUrl, produto)
      .toPromise();
  }

  atualizar(produto: Produto): Promise<Produto> {
    return this.http.put<Produto>(`${this.produtosUrl}/${produto.id}`, produto)
      .toPromise()
      .then(response => {
        const produtoAlterado = response;

        return produtoAlterado;
      });
  }

  buscarPorCodigo(id: number): Promise<Produto> {
    return this.http.get<Produto>(`${this.produtosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const produto = response;

        return produto;
      });
  }

}