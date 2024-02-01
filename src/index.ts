import app from "./app";
import mongoose from "mongoose";

const port = process.env.PORT || 8080;
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
  process.env;
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(`Error connecting database: \n ${err}`));

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
