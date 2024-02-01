import { Cliente } from "../entities/Cliente";
import { ICliente } from "../entities/interfaces/ICliente";
import { ClienteRepository } from "./ports/ClientesRepository";
import { ICriarCliente } from "./ICriarCliente";
import { CpfExistenteError } from "./CpfExistenteError";

export class CriarCliente implements ICriarCliente {
  private readonly repository: ClienteRepository;

  constructor(repository: ClienteRepository) {
    this.repository = repository;
  }

  async criarCliente(cliente: ICliente): Promise<ICliente> {
    const existente = await this.repository.buscarCliente({ cpf: cliente.cpf });

    if (existente) {
      throw new CpfExistenteError();
    }

    const novoCliente = Cliente.create(cliente);
    return await this.repository.criarCliente({
      nome: novoCliente.nome,
      cpf: novoCliente.cpf.value,
      nascimento: novoCliente.nascimento,
    });
  }
}
