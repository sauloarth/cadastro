import { CpfInvalidoError } from "./CpfInvalidoError";

export class CPF {
  private readonly cpf: string;

  private constructor(cpf: string) {
    this.cpf = cpf;
  }

  static create(cpf: string): CPF {
    const formated = CPF.format(cpf);

    if (!CPF.isValid(formated)) {
      throw new CpfInvalidoError(cpf);
    } else {
      return new CPF(formated);
    }
  }

  public get value(): string {
    return this.cpf;
  }

  static format(cpf: string): string {
    return cpf.replace(/[.-]/g, "");
  }

  static isValid(cpf: string): Boolean {
    if (isNaN(parseInt(cpf, 10))) {
      return false;
    }

    if (cpf.length != 11) {
      return false;
    }

    if (CPF.recuperarVerificadores(cpf) !== cpf.slice(9)) {
      return false;
    }

    return true;
  }

  static recuperarVerificadores(cpf: string): string {
    const noveDigitos = Array.from(cpf.slice(0, 9), Number);

    const restoPrimeiroVerificador = CPF.restoEspecifico(noveDigitos);

    const primeiroVerificador =
      restoPrimeiroVerificador < 2 ? 0 : 11 - restoPrimeiroVerificador;

    const restoSegundoVerificador = CPF.restoEspecifico([
      ...noveDigitos,
      primeiroVerificador,
    ]);

    const segundoVerificador =
      restoSegundoVerificador < 2 ? 0 : 11 - restoSegundoVerificador;

    return `${primeiroVerificador}${segundoVerificador}`;
  }

  static restoEspecifico(digitos: number[]): number {
    return (
      digitos.reduce((soma, valor, index) => {
        return soma + valor * (digitos.length + 1 - index);
      }, 0) % 11
    );
  }
}
