
export class Cliente {
    id: number;
    nome: string;
    vendedor: Vendedor;
    nascimento: Date;
    tipo: string;
    endereco: string;
    bairro: string;
    cep: string;
    cidade: string;
	uf: string;
	telefone: string;
	celular: string;
	email: string;
	facebook: string;
	instagram: string;
	observacao: string;
	limite: number;	
	ativo: boolean;

}

export class Pedido {
    id: number;
    vendedor = new Vendedor;
    dataCriacao: Date;
    cliente = new Cliente();
    tipo: String;
    natureza: String;
    status: String;
    formaPagamento: FormaPagamento;
    itensPedido = new Array<ItemPedido>();
    itensSerial = new Array<Serial>();
    valorTotal : number;
}

export class ItemPedido {
    id: number;
    produto: Produto;
    valorUnitario: number;
    valorTotal: number;
    quantidade: number = 1;
}

export class Serial {
    id: number;
    produto: Produto;
    serial: String;
}
    
export enum FormaPagamento{
    DINHEIRO = "Dinheiro", 
	CARTAO_CREDITO = "Cartão de crédito",
	CARTAO_DEBITO = "Cartão de débito",
	CHEQUE = "Cheque", 
	BOLETO_BANCARIO = "Boleto bancário",
	DEPOSITO_BANCARIO = "Depósito bancário"
}

export enum StatusPedido{
    ORCAMENTO = "Orçamento", 
	EMITIDO = "Emitido",
	CANCELADO = "Cancelado",
}


export class Vendedor {
    id: number;
    nome: string;
}

export class Grupo {
    id: number;
    descricao: string;
    tipo: string;
}

export class Produto {
    id: number;
    descricao: string;
    fornecedor: Cliente;
    valorVenda: number;
    saldo: number;
    valorCompra : number;
    valorRevenda: number;
    valorDistribuicao: number;
    minimo: number;
    unidade: string;
    ativo: boolean;
    grupo: Grupo;

}


