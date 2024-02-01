import { ICliente } from "../entities/interfaces/ICliente";

export interface IBuscarCliente {
  buscarCliente: (
    cliente: Partial<ICliente>
  ) => Promise<ICliente | void | null>;
}
