import express from "express";
import dotenv from "dotenv";
import { buildRouter } from "./api";
import { appController } from "./di";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const router = buildRouter(appController);

app.use("/", router);

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error: Error) => {
  // gracefully handle error
  throw new Error(error.message);
});