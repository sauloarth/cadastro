import request from "supertest";
import app from "../app";
import { ClienteService } from "../services/ClienteService";
import { CriarCliente } from "../usecases/CriarCliente";
import { MongoClienteRepository } from "../db/MongoClienteRepository";
import { BuscarCliente } from "../usecases/BuscarCliente";
import { ListarClientes } from "../usecases/ListarClientes";

jest.mock("../db/MongoClienteRepository");

describe("Valida criacao do cliente", () => {
  let clienteService;
  beforeAll(() => {
    const repository = new MongoClienteRepository();
    const criarCliente = new CriarCliente(repository);
    const buscarCliente = new BuscarCliente(repository);
    const listarClientes = new ListarClientes(repository);

    clienteService = new ClienteService(
      criarCliente,
      buscarCliente,
      listarClientes
    );
  });
  it("Deve criar cliente", async () => {
    const res = await request(app).post("/cliente").send({
      nome: "Paulo Carlos",
      cpf: "47040935066",
      nascimento: "1993-12-28T00:00:00.000Z",
    });
    expect(res.status).toBe(200);
  });

  it("Deve falhar quando cpf for invalido", async () => {
    const res = await request(app).post("/cliente").send({
      nome: "Paulo Carlos",
      cpf: "47040935064",
      nascimento: "1993-12-28T00:00:00.000Z",
    });
    expect(res.status).toBe(422);
  });

  it("Deve falhar quando o cpf já estiver cadastrado", async () => {
    await request(app).post("/cliente").send({
      nome: "Joao da Silva",
      cpf: "883.201.310-06",
      nascimento: "1993-12-28T00:00:00.000Z",
    });

    const res = await request(app).post("/cliente").send({
      nome: "Pedro Santos",
      cpf: "883.201.310-06",
      nascimento: "2005-05-02T00:00:00.000Z",
    });

    expect(res.status).toBe(422);
  });

  it("Deve buscar cliente por cpf", async () => {
    await request(app).post("/cliente").send({
      nome: "Joao da Silva",
      cpf: "883.201.310-06",
      nascimento: "1993-12-28T00:00:00.000Z",
    });

    const res = await request(app).get("/cliente").query({
      cpf: "883.201.310-06",
    });

    expect(res.body.nome).toBe("Joao da Silva");
  });

  it("Deve buscar cliente por nome", async () => {
    await request(app).post("/cliente").send({
      nome: "Leandro Cordeiro",
      cpf: "21086576063",
      nascimento: "1993-12-28T00:00:00.000Z",
    });

    const res = await request(app).get("/cliente").query({
      nome: "Leandro Cordeiro",
    });

    expect(res.body.cpf).toBe("21086576063");
  });

  it("Deve buscar cliente por nascimento", async () => {
    await request(app).post("/cliente").send({
      nome: "Bernardo Filho",
      cpf: "182.603.290-85",
      nascimento: "2005-07-22T00:00:00.000Z",
    });

    const res = await request(app).get("/cliente").query({
      nascimento: "2005-07-22T00:00:00.000Z",
    });

    expect(res.body.cpf).toBe("18260329085");
  });

  it("Deve listar clientes", async () => {
    const res = await request(app).get("/clientes");

    expect(res.body.clientes).toBeInstanceOf(Array);
  });
});
