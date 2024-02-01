import { CPF } from "./Cpf";
import { ICliente } from "./interfaces/ICliente";

export class Cliente {
  private readonly _nome: string;
  private readonly _cpf: CPF;
  private readonly _nascimento: Date;

  private constructor(nome: string, cpf: CPF, nascimento: Date) {
    this._nome = nome;
    this._cpf = cpf;
    this._nascimento = nascimento;
  }

  static create(cliente: ICliente): Cliente {
    const cpfValido = CPF.create(cliente.cpf);

    return new Cliente(cliente.nome, cpfValido, cliente.nascimento);
  }

  get nome(): string {
    return this._nome;
  }

  get cpf(): CPF {
    return this._cpf;
  }

  get nascimento(): Date {
    return this._nascimento;
  }
}
