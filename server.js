const express = require("express");
const app = express();
const port = 3000;
const { analyzeLogFile } = require("./systemMonitor");
const upload = require('./uploadMiddleWare')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <h1>Log Analyzer</h1>
    <form action="/analyze" method="post" enctype="multipart/form-data">
      <input type="file" name="logfile" />
      <button type="submit">Analyze</button>
    </form>
  `);
});

app.post("/analyze", upload.single("logfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const alerts = analyzeLogFile(req.file);

  res.send(`<h1>Analysis Results</h1><pre>${alerts.join("\n")}</pre>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});