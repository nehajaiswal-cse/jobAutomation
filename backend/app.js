import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jobroutes from "./jobroutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"));

app.use("/api/jobs", jobroutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});