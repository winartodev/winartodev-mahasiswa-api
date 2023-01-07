import express from "express";
import { connectToDatabase } from "./services/database.service";
import { mahasiswaRouter } from "./routes/mahasiswa.router";

const app = express();
const port = 8000;

connectToDatabase()
  .then(() => {
    app.use("/mahasiswa", mahasiswaRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
