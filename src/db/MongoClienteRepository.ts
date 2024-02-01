import { ICliente, IClientePage } from "../entities/interfaces/ICliente";
import { IOpcoesPaginacao } from "../entities/interfaces/IPageOptions";
import { ClienteRepository } from "../usecases/ports/ClientesRepository";
import { removeEmpty } from "../util";
import ClienteModel from "./ClienteModel";

export class MongoClienteRepository implements ClienteRepository {
  async criarCliente(cliente: ICliente): Promise<ICliente> {
    const novoCliente = await ClienteModel.create(cliente);
    return novoCliente;
  }
  async buscarCliente(
    cliente: Partial<ICliente>
  ): Promise<void | ICliente | null> {
    if (cliente.cpf) {
      cliente.cpf = cliente.cpf.replace(/[.-]/g, "");
    }

    return await ClienteModel.findOne({ ...removeEmpty(cliente) });
  }
  async listarClientes(pagination: IOpcoesPaginacao): Promise<IClientePage> {
    const resultados = await ClienteModel.paginate(undefined, {
      ...pagination.options,
    });

    return {
      clientes: resultados.docs,
      existePaginaAnterior: resultados.hasPrevPage,
      existeProximaPagina: resultados.hasNextPage,
      limite: resultados.limit,
      pagina: resultados.page,
      offset: resultados.offset,
      totalPaginas: resultados.totalPages,
      totalResultados: resultados.totalDocs,
    } satisfies IClientePage;
  }
}
