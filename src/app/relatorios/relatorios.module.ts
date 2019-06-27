import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatoriosPedidosComponent } from './relatorios-pedidos/relatorios-pedidos.component';

@NgModule({
  declarations: [RelatoriosPedidosComponent],
  imports: [
    CommonModule,

    SharedModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
