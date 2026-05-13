import { useState } from "react";
import axios from "axios";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const apply = async () => {
    if (!keyword || !email || !resume) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("keyword", keyword);
      formData.append("candidateEmail", email);
      formData.append("resume", resume);

      const res = await axios.post(
        "http://localhost:5000/api/jobs/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      setJobs(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("Automation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT SECTION */}

        <div className="space-y-8">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-sm font-medium shadow-sm">

            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>

            AI Powered Job Automation

          </div>

          <div>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight text-slate-800">

              Automate Your

              <span className="block bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Job Hunt
              </span>

            </h1>

            <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-xl">

              Automatically search jobs, upload resumes,
              and apply using intelligent browser automation.

            </p>

          </div>

          <div className="flex gap-4 flex-wrap">

            <div className="px-5 py-3 bg-white rounded-2xl shadow-md border border-slate-200">
              <h3 className="font-semibold text-slate-800">Fast Applications</h3>
              <p className="text-sm text-slate-500 mt-1">
                Apply to multiple jobs instantly
              </p>
            </div>

            <div className="px-5 py-3 bg-white rounded-2xl shadow-md border border-slate-200">
              <h3 className="font-semibold text-slate-800">AI Automation</h3>
              <p className="text-sm text-slate-500 mt-1">
                Smart automated workflow
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SECTION */}

        <div className="relative">

          <div className="absolute inset-0 bg-indigo-300 blur-3xl opacity-20 rounded-full"></div>

          <div className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl p-8">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-bold text-slate-800">
                  Start Automation
                </h2>

                <p className="text-slate-500 mt-1">
                  Apply jobs instantly
                </p>

              </div>

            </div>

            <div className="space-y-6">

              {/* KEYWORD */}

              <div>

                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Job Keyword
                </label>

                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Java Developer"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder:text-slate-400"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Candidate Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="candidate@gmail.com"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder:text-slate-400"
                />

              </div>

              {/* RESUME */}

              <div>

                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Upload Resume
                </label>

                <input
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-300 text-slate-700"
                />

              </div>

              {/* BUTTON */}

              <button
                onClick={apply}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:scale-[1.02] transition-all duration-300 font-semibold text-lg text-white shadow-lg"
              >

                {loading
                  ? "Running Automation..."
                  : "Start Job Automation"}

              </button>

            </div>

            {/* JOBS */}

            {jobs.length > 0 && (

              <div className="mt-8">

                <h3 className="text-2xl font-bold mb-4 text-slate-800">
                  Extracted Jobs
                </h3>

                <div className="space-y-4 max-h-80 overflow-y-auto">

                  {jobs.map((job, i) => (

                    <div
                      key={i}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm"
                    >

                      <h4 className="font-semibold text-lg text-slate-800">
                        {job.title || job}
                      </h4>
                       <p className="text-slate-600 mt-2">
                         Company: {job.company}
                       </p>
                       <p className="text-slate-600">
                         Portal: {job.portal}
                       </p>
                       <p className="text-green-600 font-medium mt-1">
                         {job.status}
                          </p>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>
        </div>
      </div>
    </div>
  );
}