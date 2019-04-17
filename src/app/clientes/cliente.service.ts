import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Cliente } from './../core/model';
import { MoneyHttp } from '../seguranca/money-http';

export class ClienteFiltro {
  id: string;
  nome: string;
  tipo: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class ClienteService {

  clientesUrl: string;

  constructor(private http: MoneyHttp) {
    this.clientesUrl = `${environment.apiUrl}/clientes`;
  }

  /*urlUploadAnexo(): string {
    return `${this.clientesUrl}/anexo`;
  }*/

  pesquisar(filtro: ClienteFiltro): Promise<any> {
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

    return this.http.get<any>(`${this.clientesUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const clientes = response.content;

        const resultado = {
          clientes,
          total: response.totalElements
        };

        return resultado;
      });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.clientesUrl}/${id}`)
      .toPromise()
      .then(() => null);
  
  }

  adicionar(cliente: Cliente): Promise<Cliente> {
    return this.http.post<Cliente>(this.clientesUrl, cliente)
      .toPromise();
  }

  atualizar(cliente: Cliente): Promise<Cliente> {
    return this.http.put<Cliente>(`${this.clientesUrl}/${cliente.id}`, cliente)
      .toPromise()
      .then(response => {
        const clienteAlterado = response;

        this.converterStringsParaDatas([clienteAlterado]);

        return clienteAlterado;
      });
  }

  buscarPorCodigo(id: number): Promise<Cliente> {
    return this.http.get<Cliente>(`${this.clientesUrl}/${id}`)
      .toPromise()
      .then(response => {
        const cliente = response;

        this.converterStringsParaDatas([cliente]);

        return cliente;
      });
  }

  private converterStringsParaDatas(clientes: Cliente[]) {
    for (const cliente of clientes) {
      if(cliente.nascimento){
      cliente.nascimento = moment(cliente.nascimento,
        'YYYY-MM-DD').toDate();
      }
    }
  }

}