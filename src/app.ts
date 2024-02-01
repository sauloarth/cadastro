import express, { Express } from "express";
import clientRouter from "./api/ClientesAPI";

const app: Express = express();
app.use(express.json());
app.use("/", clientRouter);

export default app;
