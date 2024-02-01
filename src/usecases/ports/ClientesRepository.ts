import { ICliente, IClientePage } from "../../entities/interfaces/ICliente";
import { IOpcoesPaginacao } from "../../entities/interfaces/IPageOptions";

export interface ClienteRepository {
  criarCliente: (cliente: ICliente) => Promise<ICliente>;
  buscarCliente: (
    cliente: Partial<ICliente>
  ) => Promise<ICliente | void | null>;
  listarClientes: (paginacao: IOpcoesPaginacao) => Promise<IClientePage>;
}
