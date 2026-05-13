import Job from "./jobmodels.js";
import { applyJobs } from "./services/playwriteBot.js";

export const applyForJobs = async (req, res) => {
  try {
    const { keyword,candidateEmail } = req.body;
    const resumePath=req.file.path; 
    const jobs = await applyJobs(keyword,resumePath);
    console.log(jobs)
    const saved = await Job.insertMany(
      jobs.map(job => ({
        title: job,
        company: "Indeed",
        portal: "Indeed"
      }))
    );

    res.json({ success: true, data: saved });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};