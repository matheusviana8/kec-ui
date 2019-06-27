import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatoriosPedidosComponent } from './relatorios-pedidos/relatorios-pedidos.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'pedidos',
    component: RelatoriosPedidosComponent,
    canActivate: [ AuthGuard ],
    data: { roles: ['ROLE_PESQUISAR_PEDIDO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
