import { IClientePage } from "../entities/interfaces/ICliente";
import { ClienteRepository } from "./ports/ClientesRepository";
import { IListarClientes } from "./IListarClientes";
import { IOpcoesPaginacao } from "../entities/interfaces/IPageOptions";

export class ListarClientes implements IListarClientes {
  private readonly repository: ClienteRepository;

  constructor(repository: ClienteRepository) {
    this.repository = repository;
  }

  async listarClientes(paginacao: IOpcoesPaginacao): Promise<IClientePage> {
    return await this.repository.listarClientes(paginacao);
  }
}
