import { IClientePage } from "../entities/interfaces/ICliente";
import { IOpcoesPaginacao } from "../entities/interfaces/IPageOptions";

export interface IListarClientes {
  listarClientes: (paginacao: IOpcoesPaginacao) => Promise<IClientePage>;
}
