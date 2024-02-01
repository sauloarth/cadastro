import { ICliente, IClientePage } from "../entities/interfaces/ICliente";
import { IOpcoesPaginacao } from "../entities/interfaces/IPageOptions";
import { IBuscarCliente } from "../usecases/IBuscarCliente";
import { ICriarCliente } from "../usecases/ICriarCliente";
import { IListarClientes } from "../usecases/IListarClientes";

export class ClienteService {
  constructor(
    private readonly criarCliente: ICriarCliente,
    private readonly buscarCliente: IBuscarCliente,
    private readonly listarClientes: IListarClientes
  ) {}

  async criar(cliente: ICliente): Promise<ICliente> {
    return await this.criarCliente.criarCliente(cliente);
  }

  async buscar(cliente: Partial<ICliente>): Promise<ICliente | void | null> {
    return await this.buscarCliente.buscarCliente(cliente);
  }

  async listar(paginacao: IOpcoesPaginacao): Promise<IClientePage> {
    return await this.listarClientes.listarClientes(paginacao);
  }
}
