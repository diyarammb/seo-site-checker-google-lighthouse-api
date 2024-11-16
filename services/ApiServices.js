const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.GOOGLE_LIGHTHOUSE_API_KEY;

const runLighthouseTest = async (url, strategy) => {
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
};

module.exports = runLighthouseTest;
