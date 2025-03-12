const express = require("express");
const app = express();
const port = 3000;
const { analyzeLogFile } = require("./systemMonitor");
const upload = require("./uploadMiddleWare");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ mssg: "welcome" });
});

app.post("/analyze", upload.single("logfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const alerts = analyzeLogFile(req.file);

  res.json({ alerts });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
