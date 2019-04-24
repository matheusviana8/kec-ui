import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { PedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { PedidoCadastroComponent } from './pedido-cadastro/pedido-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: PedidosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PEDIDO'] }
  },
  {
    path: 'novo',
    component: PedidoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PEDIDO'] }
  },
  {
    path: ':id',
    component: PedidoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PEDIDO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }