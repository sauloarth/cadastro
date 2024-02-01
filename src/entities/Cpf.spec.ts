import { CPF } from "./Cpf";
import { CpfInvalidoError } from "./CpfInvalidoError";

describe("Valida cpf", () => {
  it("Deve criar cpf quando um valor valido é inserido com máscara", () => {
    const resultado = CPF.create("093.905.800-64");

    expect(resultado.value).toEqual("09390580064");
  });

  it("Deve criar cpf quando um valor valido é inserido sem máscara", () => {
    const resultado = CPF.create("24589164060");

    expect(resultado.value).toEqual("24589164060");
  });

  it("Deve lançar exceção quando cpf é invalido", () => {
    expect(() => CPF.create("123.456.789-10")).toThrow(CpfInvalidoError);
  });
});
