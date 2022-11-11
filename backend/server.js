import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRoute from "./routes/usersRoute.js";

const app = express();

import dotenv from "dotenv";

dotenv.config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", usersRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Sucessfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
});
