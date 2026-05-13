import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  portal: String,
  status: { type: String, default: "Applied" },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Job", jobSchema);