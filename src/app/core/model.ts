
export class Cliente {
    id: number;
    nome: string;
    vendedor: Vendedor;
    nascimento: Date;

}

export class Pedido {
    id: number;
    vendedor: Vendedor;
    dataCriacao: Date;
    cliente: Cliente;
    tipo: String;
    natureza: String;
    status: String;
    formaPagamento: FormaPagamento;
    itensPedido = new Array<ItemPedido>();
}

export class ItemPedido {
    id: number;
    produto: Produto;
    valorUnitario: number;
    valorTotal: number;
    quantidade: number = 1;
}
    
export enum FormaPagamento{
    DINHEIRO = "Dinheiro", 
	CARTAO_CREDITO = "Cartão de crédito",
	CARTAO_DEBITO = "Cartão de débito",
	CHEQUE = "Cheque", 
	BOLETO_BANCARIO = "Boleto bancário",
	DEPOSITO_BANCARIO = "Depósito bancário"
}


export class Vendedor {
    id: number;
    nome: string;
}

export class Grupo {
    id: number;
    descricao: string;
}

export class Produto {
    id: number;
    descricao: string;
    fornecedor: Cliente;
    valorVenda: number;
}


