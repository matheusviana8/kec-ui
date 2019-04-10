import { itemPedido } from './itemPedido';

export class Pedido {
    id: number;
    nome: string;
    itensPedido: itemPedido[] = [];
}
