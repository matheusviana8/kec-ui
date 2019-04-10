import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';

@NgModule({
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

    SharedModule,
    ClientesRoutingModule
  ],
  declarations: [
    ClienteCadastroComponent, ClientesPesquisaComponent  
  ],
  exports: []
})

export class ClientesModule { }
