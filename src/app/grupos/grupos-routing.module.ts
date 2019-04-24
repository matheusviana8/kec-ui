import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { GruposPesquisaComponent } from './grupos-pesquisa/grupos-pesquisa.component';
import { GrupoCadastroComponent } from './grupo-cadastro/grupo-cadastro.component';


const routes: Routes = [
  {
    path: '',
    component: GruposPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_GRUPO'] }
  },
  {
    path: 'novo',
    component: GrupoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_GRUPO'] }
  },
  {
    path: ':id',
    component: GrupoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_GRUPO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GruposRoutingModule { }