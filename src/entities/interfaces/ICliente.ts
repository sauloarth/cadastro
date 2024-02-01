export interface ICliente {
  nome: string;
  cpf: string;
  nascimento: Date;
}

export interface IClientePage {
  clientes: ICliente[];
  existeProximaPagina: Boolean;
  existePaginaAnterior: Boolean;
  limite: number;
  pagina?: number;
  offset: number;
  totalResultados: number;
  totalPaginas: number;
}
