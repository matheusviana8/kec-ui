import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../grupo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { VendedorService } from 'src/app/vendedores/vendedor.service';
import { Grupo } from 'src/app/core/model';

@Component({
  selector: 'app-grupo-cadastro',
  templateUrl: './grupo-cadastro.component.html',
  styleUrls: ['./grupo-cadastro.component.css']
})
export class GrupoCadastroComponent implements OnInit {
  grupo = new Grupo();

  tipos = [{
    "value": "PRODUTO",
    "label": "PRODUTO"
}, {
    "value": "SERVIÇO",
    "label": "SERVIÇO"
}]


  constructor(
    private grupoService: GrupoService,
    private vendedorService: VendedorService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    
  ) { }

  

  ngOnInit() {
    const idGrupo = this.route.snapshot.params['id'];

    this.title.setTitle('Novo grupo');

    if (idGrupo) {
      this.carregarGrupo(idGrupo);
    }

  }

  carregarGrupo(id: number) {
    this.grupoService.buscarPorCodigo(id)
      .then(grupo => {
        this.grupo = grupo;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarGrupo(form);
    } else {
      this.adicionarGrupo(form);
    }
  }

  adicionarGrupo(form: FormControl) {
    this.grupoService.adicionar(this.grupo)
      .then(grupoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Grupo adicionado com sucesso!' });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/grupos', grupoAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarGrupo(form: FormControl) {
    this.grupoService.atualizar(this.grupo)
      .then(grupo => {
        this.grupo = grupo;

        this.messageService.add({ severity: 'success', detail: 'Grupo alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.grupo.id)
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.grupo = new Grupo();
    }.bind(this), 1);

    this.router.navigate(['/grupos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de grupo: ${this.grupo.descricao}`);
  }

}
