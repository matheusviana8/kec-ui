
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
}


