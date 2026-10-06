import { useState } from "react";
import { generateCurriculum } from "./services/api";

function App() {
  const [formData, setFormData] = useState({
    goal: "",
    skills: "",
    level: "Beginner",
  });
  const [status, setStatus] = useState("initial"); // initial, loading, success, error
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const data = await generateCurriculum(formData);
      setResult(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Automated Curriculum Designer
          </h1>
          <p className="text-lg text-slate-600">
            Create a personalized learning path using NLP.
          </p>
        </header>

        {(status === "initial" || status === "error") && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-md border border-slate-100"
          >
            <label className="block font-semibold text-slate-700 mb-2">
              What do you want to become?
            </label>
            <input
              type="text"
              placeholder="e.g., Full Stack Developer"
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-6"
              required
            />

            <label className="block font-semibold text-slate-700 mb-2">
              What do you already know?
            </label>
            <textarea
              placeholder="e.g., I know HTML, CSS and basic JavaScript"
              value={formData.skills}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-6 h-32 resize-none"
              required
            />

            <label className="block font-semibold text-slate-700 mb-2">
              Current Level
            </label>
            <select
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            {status === "error" && (
              <p className="text-red-500 font-medium mt-4">
                Failed to connect to backend. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg mt-8 transition-colors"
            >
              Generate Curriculum
            </button>
          </form>
        )}

        {status === "loading" && (
          <div className="bg-white p-12 rounded-xl shadow-md text-center border border-slate-100">
            <h2 className="text-2xl font-bold text-blue-600 mb-2 animate-pulse">
              Analyzing your skills...
            </h2>
            <p className="text-slate-600">
              Building your personalized curriculum using AI...
            </p>
          </div>
        )}

        {status === "success" && result && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100">
              <h2 className="text-2xl font-bold border-b pb-4 mb-4 text-slate-800">
                Your Personalized Curriculum
              </h2>
              <div className="space-y-2 text-slate-700">
                <p>
                  <strong className="text-slate-900">Goal:</strong>{" "}
                  {result.analysis.goal}
                </p>
                <p>
                  <strong className="text-slate-900">Existing Skills:</strong>{" "}
                  {result.analysis.skills.join(", ") || "None detected"}
                </p>
                <p>
                  <strong className="text-slate-900">Skill Gaps:</strong>{" "}
                  <span className="text-blue-600 font-medium">
                    {result.analysis.missingSkills.join(" → ")}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-wide uppercase">
                Learning Roadmap
              </h3>
              <div className="space-y-4">
                {result.curriculum.map((mod) => (
                  <div
                    key={mod.module}
                    className="bg-white p-6 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl font-extrabold text-slate-200">
                        {String(mod.module).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="text-xl font-bold text-slate-800">
                          {mod.title}
                        </h4>
                        <span className="inline-block mt-1 text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase tracking-wider">
                          {mod.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4 italic">
                      {mod.objective}
                    </p>
                    <ul className="grid grid-cols-2 gap-2 pl-6 list-disc text-slate-700 marker:text-blue-500">
                      {mod.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStatus("initial")}
              className="w-full p-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
