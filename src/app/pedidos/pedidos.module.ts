import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoCadastroComponent } from './pedido-cadastro/pedido-cadastro.component';
import { PedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from 'primeng/components/common/shared';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidoService } from './pedido.service';

@NgModule({
  declarations: [PedidoCadastroComponent, PedidosPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    PanelModule,
    InputTextModule,
    ConfirmDialogModule,
    ButtonModule,
    CurrencyMaskModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    InputMaskModule,

    SharedModule,
    PedidosRoutingModule,
  ], providers: [
    PedidoService
  ]
})
export class PedidosModule { }
