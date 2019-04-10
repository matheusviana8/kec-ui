import { Injectable } from '@angular/core';
import { MoneyHttp } from '../seguranca/money-http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  usuariosUrl: string;

  constructor(private http: MoneyHttp) {
    this.usuariosUrl = `${environment.apiUrl}/vendedores`;
  }

  listar(): Promise<any> {
    return this.http.get(this.usuariosUrl)
      .toPromise();
  }
}
