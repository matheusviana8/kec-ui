import { Produto } from './produto';
import { Pedido } from './pedido';
export class itemPedido {
    id: number;
    produto: Produto;
    valorUnitario: number;
    valorTotal: number;
    quantidade: number = 1;
    pedido: Pedido;
}
