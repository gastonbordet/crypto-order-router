import express from "express";
import dotenv from "dotenv";
import router from "./api";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/", router);

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error: Error) => {
  // gracefully handle error
  throw new Error(error.message);
});