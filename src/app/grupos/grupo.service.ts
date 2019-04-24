import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Grupo } from './../core/model';
import { MoneyHttp } from '../seguranca/money-http';

export class GrupoFiltro {
  id: string;
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class GrupoService {

  gruposUrl: string;

  constructor(private http: MoneyHttp) {
    this.gruposUrl = `${environment.apiUrl}/grupos`;
  }

  pesquisar(filtro: GrupoFiltro): Promise<any> {
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

    return this.http.get<any>(`${this.gruposUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const grupos = response.content;

        const resultado = {
          grupos: grupos,
          total: response.totalElements
        };
        
        return resultado;
      });
  }
  
  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.gruposUrl}/${id}`)
      .toPromise()
      .then(() => null);
  
  }

  adicionar(grupo: Grupo): Promise<Grupo> {
    return this.http.post<Grupo>(this.gruposUrl, grupo)
      .toPromise();
  }

  atualizar(grupo: Grupo): Promise<Grupo> {
    return this.http.put<Grupo>(`${this.gruposUrl}/${grupo.id}`, grupo)
      .toPromise()
      .then(response => {
        const clienteAlterado = response;

        //this.converterStringsParaDatas([clienteAlterado]);

        return clienteAlterado;
      });
  }

  buscarPorCodigo(id: number): Promise<Grupo> {
    return this.http.get<Grupo>(`${this.gruposUrl}/${id}`)
      .toPromise()
      .then(response => {
        const grupo = response;

        return grupo;
      });
  }

}