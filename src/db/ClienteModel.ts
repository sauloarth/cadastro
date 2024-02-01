import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { ICliente } from "../entities/interfaces/ICliente";

const schema = new Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true },
  nascimento: { type: Date, required: true },
});

schema.plugin(paginate);

interface ClienteDocument extends mongoose.Document, ICliente {}

export default mongoose.model<
  ClienteDocument,
  mongoose.PaginateModel<ClienteDocument>
>("Clientes", schema, "clientes");
