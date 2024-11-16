const runLighthouseTest = require("../services/ApiServices");

const ApiController = async (req, res) => {
  const url = req.body.url;
  const strategy = req.body.strategy || "mobile";

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const data = await runLighthouseTest(url, strategy);
    if (!data) {
      return res.status(500).json({ error: "Lighthouse test failed" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = ApiController;
