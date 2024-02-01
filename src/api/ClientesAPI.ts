import { MongoClienteRepository } from "../db/MongoClienteRepository";
import { CpfInvalidoError } from "../entities/CpfInvalidoError";
import express, { Request, Response } from "express";
import { ClienteService } from "../services/ClienteService";
import { BuscarCliente } from "../usecases/BuscarCliente";
import { ClienteNaoEncontradoError } from "../usecases/ClienteNaoEncontradoError";
import { CpfExistenteError } from "../usecases/CpfExistenteError";
import { CriarCliente } from "../usecases/CriarCliente";
import { ListarClientes } from "../usecases/ListarClientes";

const clientRouter = express.Router();

const repository = new MongoClienteRepository();
const criarCliente = new CriarCliente(repository);
const buscarCliente = new BuscarCliente(repository);
const listarClientes = new ListarClientes(repository);
const clienteService = new ClienteService(
  criarCliente,
  buscarCliente,
  listarClientes
);

clientRouter.post("/cliente", async (req: Request, res: Response) => {
  try {
    console.log("criar cliente");

    const novoCliente = await clienteService.criar(req.body);
    res.send(novoCliente);
  } catch (error: unknown) {
    console.log("erro: " + (error as Error).message);
    if (
      error instanceof CpfInvalidoError ||
      error instanceof CpfExistenteError
    ) {
      res.status(422).json({ erro: error.message });
    } else {
      res.status(500).json({ erro: "Erro no servidor. Tente mais tarde" });
    }
  }
});

clientRouter.get("/cliente", async (req: Request, res: Response) => {
  try {
    console.log("buscar cliente");

    if (!req.query) {
      res.status(400).json({ erro: "Informe parametros para a pesquisa" });
    }

    console.log("entrada: ");
    console.log(req.query);
    const encontrado = await clienteService.buscar({ ...req.query });
    res.send(encontrado);
  } catch (error: unknown) {
    console.log("erro: " + (error as Error).message);
    if (error instanceof ClienteNaoEncontradoError) {
      res.status(404).json({ erro: error.message });
    } else {
      res.status(500).json({ erro: "Erro no servidor. Tente mais tarde" });
    }
  }
});

clientRouter.get("/clientes", async (req: Request, res: Response) => {
  try {
    console.log("listar clientes");
    console.log("entrada: ");
    console.log(req.query);

    const encontrado = await clienteService.listar({
      options: { ...req.query },
    });
    res.send(encontrado);
  } catch (error: unknown) {
    console.log("erro: " + (error as Error).message);
    if (error instanceof ClienteNaoEncontradoError) {
      res.status(404).json({ erro: error.message });
    } else {
      res.status(500).json({ erro: "Erro no servidor. Tente mais tarde" });
    }
  }
});

export default clientRouter;
