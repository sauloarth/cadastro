import { ICliente } from "../entities/interfaces/ICliente";

export interface ICriarCliente {
  criarCliente: (cliente: ICliente) => Promise<ICliente>;
}
