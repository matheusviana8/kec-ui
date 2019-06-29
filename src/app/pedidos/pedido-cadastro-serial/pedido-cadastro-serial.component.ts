import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PedidoService } from '../pedido.service';
import { VendedorService } from 'src/app/vendedores/vendedor.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Pedido, ItemPedido, StatusPedido, Serial } from 'src/app/core/model';

@Component({
  selector: 'app-pedido-cadastro-serial',
  templateUrl: './pedido-cadastro-serial.component.html',
  styleUrls: ['./pedido-cadastro-serial.component.css']
})
export class PedidoCadastroSerialComponent implements OnInit {

  pedido = new Pedido();
  itensPedido = new Array<ItemPedido>();
  status =[];
  serial = new Serial();
  itemIndex = 0;

  constructor(
    private pedidoService: PedidoService,
    private vendedorService: VendedorService,
    private errorHandler: ErrorHandlerService,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const idPedido = this.route.snapshot.params['id'];

    this.title.setTitle('Cadastrar seriais');
    this.carregarPedido(idPedido);
    this.carregarFormulario();
  }

  salvar(form: FormControl) {
  
  }

  carregarPedido(id: number) {
    this.pedidoService.buscarPorCodigo(id)
      .then(pedido => {
        this.pedido = pedido;
        this.itensPedido = pedido.itensPedido;
        this.pedido.itensSerial = pedido.itensSerial;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  prepararNovoItem() {
    this.serial = new Serial();
    this.itemIndex = this.pedido.itensPedido.length;
  }

  removerItem(index: number) {
    this.pedido.itensSerial.splice(index, 1);
  }
  
  editarItem(index: number) {
    this.serial = this.pedido.itensSerial[index];
    this.removerItem(index);
    
  }
  adicionarSerial(){
    console.log(this.serial);
    console.log(this.pedido.itensSerial);
     /*this.pedido.itensSerial.splice(this.itemIndex,0,this.serial);
     this.prepararNovoItem();
     this.itemIndex++;
   */
 }
  carregarFormulario(){

    for (let key in StatusPedido) {
      let labelEnum = StatusPedido[key];
      let valueEnum = key;
      this.status.push({label: labelEnum, value: valueEnum});
    }
  }

}
