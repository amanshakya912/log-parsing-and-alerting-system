const fs = require("fs");

const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
const suspiciousPatterns = config.suspiciousPatterns;
const regexPatterns = config.regexPatterns.map(pattern => new RegExp(pattern, "i"));

function analyzeLogFile(file) {
  const alerts = [];

  const data = fs.readFileSync(file.path, "utf-8");
  const lines = data.split("\n");

  lines.forEach((line, index) => {
    suspiciousPatterns.forEach((pattern) => {
      if (line.toLowerCase().includes(pattern)) {
        alerts.push(`🚨 ALERT: ${pattern.toUpperCase()} at Line ${index + 1}: ${line.trim()}`);
      }
    });

    regexPatterns.forEach((regex) => {
      if (regex.test(line)) {
        alerts.push(`🚨 ALERT: SUSPICIOUS PATTERN DETECTED AT LINE ${index + 1}: ${line.trim()}`);
      }
    });
  });

  return alerts;
}

module.exports = { analyzeLogFile };