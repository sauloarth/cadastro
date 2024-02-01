export class CpfInvalidoError extends Error {
  constructor(cpf: string) {
    super(`Cliente não criado. Cpf ${cpf} é invalido.`);
    this.name = "CpfInvalidoError";
  }
}
