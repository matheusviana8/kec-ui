
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
const routes: Routes = [
  { path: 'clientes', loadChildren: './clientes/clientes.module#ClientesModule' },
  { path: 'produtos', loadChildren: './produtos/produtos.module#ProdutosModule' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }