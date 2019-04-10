import { ProdutosRoutingModule } from './produtos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'primeng/components/common/shared';

@NgModule({
  declarations: [ProdutoCadastroComponent, ProdutosPesquisaComponent],
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
    ProdutosRoutingModule,
  ]
})
export class ProdutosModule { }
