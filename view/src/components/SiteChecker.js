import { useState, useEffect } from "react";
import axios from "axios";

const SiteChecker = () => {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState("desktop");
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3292/api/site-check",
        {
          url,
          strategy
        }
      );
      setScore(
        response.data.lighthouseResult.categories.performance.score * 100
      );
    } catch (error) {
      console.error("Error fetching Lighthouse data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Google Lighthouse Test Results for {strategy}
        </h2>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter site URL"
                  required
                  className=" m-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <select
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  className=" m-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn btn-success ${
                    isLoading
                      ? "bg-gray-500"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {isLoading ? "Loading..." : "Run Test"}
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>

        {score !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-medium">
              Performance Score:{" "}
              <span className="text-2xl font-bold text-green-600">{score}</span>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteChecker;
