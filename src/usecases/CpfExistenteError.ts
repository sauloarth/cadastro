export class CpfExistenteError extends Error {
  constructor() {
    super(`O cliente não pode ser cadastrado`);
    this.name = "CpfExistenteError";
  }
}
