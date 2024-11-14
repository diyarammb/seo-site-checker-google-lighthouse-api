require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

const API_KEY = process.env.GOOGLE_LIGHTHOUSE_API_KEY;
async function runLighthouseTest(url, strategy) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`,
      {
        params: {
          url: url,
          key: API_KEY,
          category: "performance",
          strategy: strategy
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error running Lighthouse test:", error);
    return null;
  }
}

app.get("/", async (req, res) => {
  const urlToTest = "https://example.com";
  const strategy = req.query.strategy || "mobile";
  const data = await runLighthouseTest(urlToTest, strategy);

  if (data) {
    res.send(`
      <html>
        <head>
          <title>Lighthouse Test Results (${
            strategy.charAt(0).toUpperCase() + strategy.slice(1)
          })</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .score { font-size: 24px; font-weight: bold; color: green; }
          </style>
        </head>
        <body>
          <h1>Google Lighthouse Test Results for ${urlToTest} (${strategy.toUpperCase()})</h1>
          <h2>Performance Score: <span class="score">${
            data.lighthouseResult.categories.performance.score * 100
          }</span></h2>
          <h3>Metrics:</h3>
          <ul>
            <li>First Contentful Paint: ${
              data.lighthouseResult.audits["first-contentful-paint"]
                .displayValue
            }</li>
            <li>Speed Index: ${
              data.lighthouseResult.audits["speed-index"].displayValue
            }</li>
            <li>Time to Interactive: ${
              data.lighthouseResult.audits["interactive"].displayValue
            }</li>
            <li>Total Blocking Time: ${
              data.lighthouseResult.audits["total-blocking-time"].displayValue
            }</li>
            <li>Cumulative Layout Shift: ${
              data.lighthouseResult.audits["cumulative-layout-shift"]
                .displayValue
            }</li>
          </ul>
        </body>
      </html>
    `);
  } else {
    res.send(
      "<p>Error fetching Lighthouse data. Check console for details.</p>"
    );
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
