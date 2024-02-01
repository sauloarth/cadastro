import { ICliente, IClientePage } from "../../entities/interfaces/ICliente";
import { IOpcoesPaginacao } from "../../entities/interfaces/IPageOptions";
import { ClienteRepository } from "../../usecases/ports/ClientesRepository";

const db: ICliente[] = [];

export class MongoClienteRepository implements ClienteRepository {
  async criarCliente(cliente: ICliente): Promise<ICliente> {
    db.push(cliente);
    return cliente;
  }
  async buscarCliente(
    cliente: Partial<ICliente>
  ): Promise<void | ICliente | null> {
    if (cliente.cpf) {
      cliente.cpf = cliente.cpf?.replace(/[.-]/g, "");
    }

    return db.find(
      (c) =>
        c.cpf === cliente.cpf ||
        c.nome === cliente.nome ||
        c.nascimento === cliente.nascimento
    );
  }
  async listarClientes(pagination: IOpcoesPaginacao): Promise<IClientePage> {
    return {
      existePaginaAnterior: false,
      existeProximaPagina: false,
      limite: 1,
      totalPaginas: 1,
      totalResultados: 1,
      pagina: 1,
      offset: 0,
      clientes: db,
    };
  }
}
