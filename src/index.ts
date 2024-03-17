const express = require("express");
const dotenv = require("dotenv");

// configures dotenv to work in your application
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const router = require('./api')

app.use("/", router)

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error: Error) => {
  // gracefully handle error
  throw new Error(error.message);
})