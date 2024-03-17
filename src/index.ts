import express from "express";
import dotenv from "dotenv";
import router from "./api";

const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.use("/", router);

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error: Error) => {
  // gracefully handle error
  throw new Error(error.message);
});