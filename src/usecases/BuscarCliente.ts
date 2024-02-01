import { ICliente } from "../entities/interfaces/ICliente";
import { ClienteRepository } from "./ports/ClientesRepository";
import { IBuscarCliente } from "./IBuscarCliente";
import { ClienteNaoEncontradoError } from "./ClienteNaoEncontradoError";

export class BuscarCliente implements IBuscarCliente {
  private readonly repository: ClienteRepository;

  constructor(repository: ClienteRepository) {
    this.repository = repository;
  }

  async buscarCliente(
    cliente: Partial<ICliente>
  ): Promise<ICliente | void | null> {
    const resultado = await this.repository.buscarCliente({
      nome: cliente?.nome,
      cpf: cliente?.cpf,
      nascimento: cliente?.nascimento,
    });

    if (!resultado) {
      throw new ClienteNaoEncontradoError();
    }

    return resultado;
  }
}
