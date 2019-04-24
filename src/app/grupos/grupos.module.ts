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
import { InputMaskModule } from 'primeng/inputmask';

import { SharedModule } from './../shared/shared.module';
import { GruposRoutingModule } from './grupos-routing.module';
import { GrupoCadastroComponent } from './grupo-cadastro/grupo-cadastro.component';
import { GruposPesquisaComponent } from './grupos-pesquisa/grupos-pesquisa.component';
import { GrupoService } from './grupo.service';

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
    InputMaskModule,

    SharedModule,
    GruposRoutingModule
  ],
  declarations: [
    GrupoCadastroComponent, GruposPesquisaComponent  
  ],
  providers: [
    GrupoService,
  ],
  exports: []
})

export class GruposModule { }
