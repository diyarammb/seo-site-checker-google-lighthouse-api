const express = require("express");
const apiRoute = require("./routes");
const cors = require("cors");

const app = express();
const port = 3292;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use("/api", apiRoute);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
