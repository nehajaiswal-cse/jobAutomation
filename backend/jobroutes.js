import express from "express";
import { applyForJobs } from "./jobcontroller.js";
import { upload } from "./middleware/upload.js";

const router = express.Router();

router.post("/apply", upload.single("resume"),applyForJobs);

export default router;